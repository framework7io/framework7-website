const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const writeEmptySponsors = () => {
  fs.writeFileSync(path.resolve(__dirname, '../src/pug/sponsors/sponsors.json'), '{}');
};

const currentImages = fs.readdirSync(path.resolve(__dirname, '../public/i/sponsors'));

const hasImage = (image) => {
  const { fileName } = image.fields.file;
  return currentImages.includes(fileName);
};

const downloadImage = (image) => {
  const { url, fileName } = image.fields.file;
  return new Promise((resolve, reject) => {
    fetch(`https:${url}`)
      .then((res) => {
        return res.buffer();
      })
      .then((buffer) => {
        try {
          fs.writeFileSync(path.resolve(__dirname, '../public/i/sponsors', fileName), buffer);
        } catch (err) {
          reject(err);
        }
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSponsor = (item) => {
  return new Promise((resolve, reject) => {
    const { createdAt } = item.sys;
    const { title, link, plan, ref, image, endsAt } = item.fields;
    const downloads = [];
    if (image && !hasImage(image)) {
      downloads.push(downloadImage(image));
    }
    Promise.all(downloads)
      .then(() => {
        const sponsor = {
          createdAt,
          title,
          link,
          plan,
          ref,
          endDate: endsAt || '',
          image: image ? image.fields.file.fileName : '',
        };
        resolve(sponsor);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const buildSponsors = async () => {
  let spaceId;
  let accessToken;

  try {
    fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf-8')
      .trim()
      .split('\n')
      .forEach((line) => {
        const [key, value] = line.split('=');
        if (key === 'CONTENTFUL_SPACE_ID') spaceId = value;
        if (key === 'CONTENTFUL_ACCESS_TOKEN') accessToken = value;
      });
  } catch (err) {
    spaceId = process.env.CONTENTFUL_SPACE_ID;
    accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  }

  if (!spaceId && !accessToken) {
    writeEmptySponsors();
    return;
  }

  const client = require('contentful').createClient({
    space: spaceId,
    accessToken,
  });

  const entries = await client.getEntries({ limit: 1000 });

  let sponsors = [];
  if (entries.items) {
    try {
      sponsors = await Promise.all(entries.items.map((item) => getSponsor(item)));
      sponsors.sort((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      });
    } catch (err) {
      writeEmptySponsors();
    }
  }

  const sponsorsToStore = {
    topSupporter: sponsors.filter((sponsor) => sponsor.plan === 'topSupporter'),
    silverSponsor: sponsors.filter((sponsor) => sponsor.plan === 'silverSponsor'),
    goldSponsor: sponsors.filter((sponsor) => sponsor.plan === 'goldSponsor'),
    platinumSponsor: sponsors.filter((sponsor) => sponsor.plan === 'platinumSponsor'),
    diamondSponsor: sponsors.filter((sponsor) => sponsor.plan === 'diamondSponsor'),
  };
  const sponsorsContent = `${JSON.stringify(sponsorsToStore, '', 2)}`;
  fs.writeFileSync(path.resolve(__dirname, '../src/pug/sponsors/sponsors.json'), sponsorsContent);
};

buildSponsors();
