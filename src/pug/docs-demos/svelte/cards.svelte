
<App>
  <View main>
    <Page>
      <Navbar title="Cards" />
      <BlockTitle>Simple Cards</BlockTitle>
      <Card
        content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
      />
      <Card
        title="Card header"
        content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
        footer="Card footer"
      />
      <Card
        content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
      />

      <BlockTitle>Outline Cards</BlockTitle>
      <Card
        outline
        content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
      />
      <Card
        outline
        title="Card header"
        content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
        footer="Card footer"
      />
      <Card
        outline
        content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
      />

      <BlockTitle>Styled Cards</BlockTitle>
      <Card class="demo-card-header-pic">
        <CardHeader
          class="no-border"
          valign="bottom"
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
        >Journey To Mountains</CardHeader>
        <CardContent>
          <p class="date">Posted on January 21, 2015</p>
          <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
        </CardContent>
        <CardFooter>
          <Link>Like</Link>
          <Link>Read more</Link>
        </CardFooter>
      </Card>
      <Card class="demo-card-header-pic">
        <CardHeader
          class="no-border"
          valign="bottom"
          style="background-image: url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
        >Journey To Mountains</CardHeader>
        <CardContent>
          <p class="date">Posted on January 21, 2015</p>
          <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
        </CardContent>
        <CardFooter>
          <Link>Like</Link>
          <Link>Read more</Link>
        </CardFooter>
      </Card>

      <BlockTitle>Facebook Cards</BlockTitle>
      <Card class="demo-facebook-card">
        <CardHeader class="no-border">
          <div class="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="34" height="34"/></div>
          <div class="demo-facebook-name">John Doe</div>
          <div class="demo-facebook-date">Monday at 3:47 PM</div>
        </CardHeader>
        <CardContent padding={false}>
          <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%"/>
        </CardContent>
        <CardFooter class="no-border">
          <Link>Like</Link>
          <Link>Comment</Link>
          <Link>Share</Link>
        </CardFooter>
      </Card>
      <Card class="demo-facebook-card">
        <CardHeader class="no-border">
          <div class="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="34" height="34"/></div>
          <div class="demo-facebook-name">John Doe</div>
          <div class="demo-facebook-date">Monday at 2:15 PM</div>
        </CardHeader>
        <CardContent>
          <p>What a nice photo i took yesterday!</p><img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%"/>
          <p class="likes">Likes: 112    Comments: 43</p>
        </CardContent>
        <CardFooter class="no-border">
          <Link>Like</Link>
          <Link>Comment</Link>
          <Link>Share</Link>
        </CardFooter>
      </Card>

      <BlockTitle>Cards With List View</BlockTitle>
      <Card>
        <CardContent padding={false}>
          <List>
            <ListItem link="#">Link 1</ListItem>
            <ListItem link="#">Link 2</ListItem>
            <ListItem link="#">Link 3</ListItem>
            <ListItem link="#">Link 4</ListItem>
            <ListItem link="#">Link 5</ListItem>
          </List>
        </CardContent>
      </Card>
      <Card title="New Releases:">
        <CardContent padding={false}>
          <List medial-list>
            <ListItem
              title="Yellow Submarine"
              subtitle="Beatles"
            >
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44"/>
            </ListItem>
            <ListItem
              title="Don't Stop Me Now"
              subtitle="Queen"
            >
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-5.jpg" width="44"/>
            </ListItem>
            <ListItem
              title="Billie Jean"
              subtitle="Michael Jackson"
            >
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-6.jpg" width="44"/>
            </ListItem>
          </List>
        </CardContent>
        <CardFooter>
          <span>January 20, 2015</span>
          <span>5 comments</span>
        </CardFooter>
      </Card>

      <BlockTitle>Expandable Cards</BlockTitle>
      <Card expandable>
        <CardContent padding={false}>
          <div class="bg-color-red" style="height: 300px">
            <CardHeader textColor="white" class="display-block">
              Framework7
              <br />
              <small style="opacity: 0.7">Build Mobile Apps</small>
            </CardHeader>
            <Link cardClose color="white" class="card-opened-fade-in" style="position: absolute; right: 15px; top: 15px" iconF7="xmark_circle_fill" />
          </div>
          <div class="card-content-padding">
            <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
            <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
            <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
            <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (Cordova or PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
          </div>
        </CardContent>
      </Card>

      <Card expandable>
        <CardContent padding={false}>
          <div class="bg-color-yellow" style="height: 300px">
            <CardHeader textColor="black" class="display-block">
              Framework7
              <br/>
              <small style="opacity: 0.7">Build Mobile Apps</small>
            </CardHeader>
            <Link cardClose color="black" class="card-opened-fade-in" style="position: absolute; right: 15px; top: 15px" iconF7="xmark_circle_fill" />
          </div>
          <div class="card-content-padding">
            <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
            <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
            <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
            <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (Cordova or PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
          </div>
        </CardContent>
      </Card>
    </Page>
  </View>
</App>
<style>
  :global(.demo-card-header-pic .card-header) {
    height: 40vw;
    background-size: cover;
    background-position: center;
    color: #fff;
  }
  :global(.demo-card-header-pic .card-content-padding .date){
    color: #8e8e93;
  }
  :global(.demo-facebook-card .card-header) {
    display: block;
    padding: 10px;
  }
  :global(.demo-facebook-card .demo-facebook-avatar) {
    float: left;
  }
  :global(.demo-facebook-card .demo-facebook-name) {
    margin-left: 44px;
    font-size: 14px;
    font-weight: 500;
  }
  :global(.demo-facebook-card .demo-facebook-date) {
    margin-left: 44px;
    font-size: 13px;
    color: #8e8e93;
  }
  :global(.demo-facebook-card .card-footer) {
    background: #fafafa;
  }
  :global(.theme-dark .demo-facebook-card .card-footer) {
    background-color: transparent;
  }
  :global(.demo-facebook-card .card-footer a) {
    color: #81848b;
    font-weight: 500;
  }
  :global(.demo-facebook-card .card-content img) {
    display: block;
  }
  :global(.demo-facebook-card .card-content-padding) {
    padding: 15px 10px;
  }
  :global(.demo-facebook-card .card-content-padding .likes) {
    color: #8e8e93;
  }
</style>
<script>
  import { App, View, Page, Navbar, BlockTitle, Card, CardHeader, CardContent, CardFooter, Link, List, ListItem } from 'framework7-svelte';
</script>
