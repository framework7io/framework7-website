import React from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  BlockTitle,
  List,
  ListInput,
  Icon,
  Range,
} from 'framework7-react';
import './inputs.css';

export default () => (
  <App>
    <View main>
      <Page>
        <Navbar title="Form Inputs"></Navbar>
        <BlockTitle>Full Layout / Inline Labels</BlockTitle>
        <List inlineLabels noHairlinesMd>
          <ListInput label="Name" type="text" placeholder="Your name" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Password" type="password" placeholder="Your password" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="E-mail" type="email" placeholder="Your e-mail" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="URL" type="url" placeholder="URL" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Phone" type="tel" placeholder="Your phone number" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="Gender"
            type="select"
            defaultValue="Male"
            placeholder="Please choose..."
          >
            <Icon icon="demo-list-icon" slot="media" />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </ListInput>

          <ListInput
            label="Birthday"
            type="date"
            defaultValue="2014-04-30"
            placeholder="Please choose..."
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Date time" type="datetime-local" placeholder="Please choose...">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Range" input={false}>
            <Icon icon="demo-list-icon" slot="media" />
            <Range slot="input" value={50} min={0} max={100} step={1} />
          </ListInput>

          <ListInput label="Textarea" type="textarea" placeholder="Bio">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Resizable" type="textarea" resizable placeholder="Bio">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        <BlockTitle>Full Layout / Stacked Labels</BlockTitle>
        <List noHairlinesMd>
          <ListInput label="Name" type="text" placeholder="Your name" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Password" type="password" placeholder="Your password" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="E-mail" type="email" placeholder="Your e-mail" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="URL" type="url" placeholder="URL" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Phone" type="tel" placeholder="Your phone number" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="Gender"
            type="select"
            defaultValue="Male"
            placeholder="Please choose..."
          >
            <Icon icon="demo-list-icon" slot="media" />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </ListInput>

          <ListInput
            label="Birthday"
            type="date"
            defaultValue="2014-04-30"
            placeholder="Please choose..."
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Date time" type="datetime-local" placeholder="Please choose...">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Range" input={false}>
            <Icon icon="demo-list-icon" slot="media" />
            <Range slot="input" value={50} min={0} max={100} step={1} />
          </ListInput>

          <ListInput label="Textarea" type="textarea" placeholder="Bio">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Resizable" type="textarea" resizable placeholder="Bio">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        <BlockTitle>Date Pickers</BlockTitle>
        <List noHairlinesMd>
          <ListInput
            label="Default setup"
            type="datepicker"
            placeholder="Your birth date"
            readonly
          ></ListInput>
          <ListInput
            label="Custom date format"
            type="datepicker"
            placeholder="Select date"
            readonly
            calendarParams={{ dateFormat: 'DD, MM dd, yyyy' }}
          ></ListInput>
          <ListInput
            label="Multiple Values"
            type="datepicker"
            placeholder="Select multiple dates"
            readonly
            calendarParams={{ dateFormat: 'M dd yyyy', multiple: true }}
          ></ListInput>
          <ListInput
            label="Range Picker"
            type="datepicker"
            placeholder="Select date range"
            readonly
            calendarParams={{ dateFormat: 'M dd yyyy', rangePicker: true }}
          ></ListInput>
          <ListInput
            label="Open in Modal"
            type="datepicker"
            placeholder="Select date"
            readonly
            calendarParams={{
              openIn: 'customModal',
              header: true,
              footer: true,
              dateFormat: 'MM dd yyyy',
            }}
          ></ListInput>
        </List>

        <BlockTitle>Color Pickers</BlockTitle>
        <List noHairlinesMd>
          <ListInput
            type="colorpicker"
            label="Color Wheel"
            placeholder="Color"
            readonly
            value={{ hex: '#00ff00' }}
          />
          <ListInput
            type="colorpicker"
            label="Saturation-Brightness Spectrum"
            placeholder="Color"
            readonly
            value={{ hex: '#ff0000' }}
            colorPickerParams={{
              modules: ['sb-spectrum', 'hue-slider'],
            }}
          />
          <ListInput
            type="colorpicker"
            label="RGB Sliders"
            placeholder="Color"
            readonly
            value={{ hex: '#0000ff' }}
            colorPickerParams={{
              modules: ['rgb-sliders'],
              sliderValue: true,
              sliderLabel: true,
            }}
          />
          <ListInput
            type="colorpicker"
            label="RGBA Sliders"
            placeholder="Color"
            readonly
            value={{ hex: '#ff00ff' }}
            colorPickerParams={{
              modules: ['rgb-sliders', 'alpha-slider'],
              sliderValue: true,
              sliderLabel: true,
              formatValue(value) {
                return `rgba(${value.rgba.join(', ')})`;
              },
            }}
          />
          <ListInput
            type="colorpicker"
            label="HSB Sliders"
            placeholder="Color"
            readonly
            value={{ hex: '#00ff00' }}
            colorPickerParams={{
              modules: ['hsb-sliders'],
              sliderValue: true,
              sliderLabel: true,
              formatValue(value) {
                return `hsb(${value.hsb[0]}, ${(value.hsb[1] * 1000) / 10}%, ${
                  (value.hsb[2] * 1000) / 10
                }%)`;
              },
            }}
          />
          <ListInput
            type="colorpicker"
            label="RGB Bars"
            placeholder="Color"
            readonly
            value={{ hex: '#0000ff' }}
            colorPickerParams={{
              modules: ['rgb-bars'],
              openIn: 'auto',
              barValue: true,
              barLabel: true,
              formatValue(value) {
                return `rgb(${value.rgb.join(', ')})`;
              },
            }}
          />
          <ListInput
            type="colorpicker"
            label="RGB Sliders + Colors"
            placeholder="Color"
            readonly
            value={{ hex: '#ffff00' }}
            colorPickerParams={{
              modules: ['initial-current-colors', 'rgb-sliders'],
              sliderValue: true,
              sliderLabel: true,
              formatValue(value) {
                return `rgb(${value.rgb.join(', ')})`;
              },
            }}
          />
          <ListInput
            type="colorpicker"
            label="Palette"
            placeholder="Color"
            readonly
            value={{ hex: '#FFEBEE' }}
            colorPickerParams={{
              modules: ['palette'],
              openIn: 'auto',
              openInPhone: 'sheet',
              palette: [
                [
                  '#FFEBEE',
                  '#FFCDD2',
                  '#EF9A9A',
                  '#E57373',
                  '#EF5350',
                  '#F44336',
                  '#E53935',
                  '#D32F2F',
                  '#C62828',
                  '#B71C1C',
                ],
                [
                  '#F3E5F5',
                  '#E1BEE7',
                  '#CE93D8',
                  '#BA68C8',
                  '#AB47BC',
                  '#9C27B0',
                  '#8E24AA',
                  '#7B1FA2',
                  '#6A1B9A',
                  '#4A148C',
                ],
                [
                  '#E8EAF6',
                  '#C5CAE9',
                  '#9FA8DA',
                  '#7986CB',
                  '#5C6BC0',
                  '#3F51B5',
                  '#3949AB',
                  '#303F9F',
                  '#283593',
                  '#1A237E',
                ],
                [
                  '#E1F5FE',
                  '#B3E5FC',
                  '#81D4FA',
                  '#4FC3F7',
                  '#29B6F6',
                  '#03A9F4',
                  '#039BE5',
                  '#0288D1',
                  '#0277BD',
                  '#01579B',
                ],
                [
                  '#E0F2F1',
                  '#B2DFDB',
                  '#80CBC4',
                  '#4DB6AC',
                  '#26A69A',
                  '#009688',
                  '#00897B',
                  '#00796B',
                  '#00695C',
                  '#004D40',
                ],
                [
                  '#F1F8E9',
                  '#DCEDC8',
                  '#C5E1A5',
                  '#AED581',
                  '#9CCC65',
                  '#8BC34A',
                  '#7CB342',
                  '#689F38',
                  '#558B2F',
                  '#33691E',
                ],
                [
                  '#FFFDE7',
                  '#FFF9C4',
                  '#FFF59D',
                  '#FFF176',
                  '#FFEE58',
                  '#FFEB3B',
                  '#FDD835',
                  '#FBC02D',
                  '#F9A825',
                  '#F57F17',
                ],
                [
                  '#FFF3E0',
                  '#FFE0B2',
                  '#FFCC80',
                  '#FFB74D',
                  '#FFA726',
                  '#FF9800',
                  '#FB8C00',
                  '#F57C00',
                  '#EF6C00',
                  '#E65100',
                ],
              ],
              formatValue(value) {
                return value.hex;
              },
            }}
          />
          <ListInput
            type="colorpicker"
            label="Pro Mode"
            placeholder="Color"
            readonly
            value={{ hex: '#00ffff' }}
            colorPickerParams={{
              modules: [
                'initial-current-colors',
                'sb-spectrum',
                'hsb-sliders',
                'rgb-sliders',
                'alpha-slider',
                'hex',
                'palette',
              ],
              openIn: 'auto',
              sliderValue: true,
              sliderValueEditable: true,
              sliderLabel: true,
              hexLabel: true,
              hexValueEditable: true,
              groupedModules: true,
              palette: [
                [
                  '#FFEBEE',
                  '#FFCDD2',
                  '#EF9A9A',
                  '#E57373',
                  '#EF5350',
                  '#F44336',
                  '#E53935',
                  '#D32F2F',
                  '#C62828',
                  '#B71C1C',
                ],
                [
                  '#F3E5F5',
                  '#E1BEE7',
                  '#CE93D8',
                  '#BA68C8',
                  '#AB47BC',
                  '#9C27B0',
                  '#8E24AA',
                  '#7B1FA2',
                  '#6A1B9A',
                  '#4A148C',
                ],
                [
                  '#E8EAF6',
                  '#C5CAE9',
                  '#9FA8DA',
                  '#7986CB',
                  '#5C6BC0',
                  '#3F51B5',
                  '#3949AB',
                  '#303F9F',
                  '#283593',
                  '#1A237E',
                ],
                [
                  '#E1F5FE',
                  '#B3E5FC',
                  '#81D4FA',
                  '#4FC3F7',
                  '#29B6F6',
                  '#03A9F4',
                  '#039BE5',
                  '#0288D1',
                  '#0277BD',
                  '#01579B',
                ],
                [
                  '#E0F2F1',
                  '#B2DFDB',
                  '#80CBC4',
                  '#4DB6AC',
                  '#26A69A',
                  '#009688',
                  '#00897B',
                  '#00796B',
                  '#00695C',
                  '#004D40',
                ],
                [
                  '#F1F8E9',
                  '#DCEDC8',
                  '#C5E1A5',
                  '#AED581',
                  '#9CCC65',
                  '#8BC34A',
                  '#7CB342',
                  '#689F38',
                  '#558B2F',
                  '#33691E',
                ],
                [
                  '#FFFDE7',
                  '#FFF9C4',
                  '#FFF59D',
                  '#FFF176',
                  '#FFEE58',
                  '#FFEB3B',
                  '#FDD835',
                  '#FBC02D',
                  '#F9A825',
                  '#F57F17',
                ],
                [
                  '#FFF3E0',
                  '#FFE0B2',
                  '#FFCC80',
                  '#FFB74D',
                  '#FFA726',
                  '#FF9800',
                  '#FB8C00',
                  '#F57C00',
                  '#EF6C00',
                  '#E65100',
                ],
              ],
              formatValue(value) {
                return `rgba(${value.rgba.join(', ')})`;
              },
            }}
          />
        </List>

        <BlockTitle>Floating Labels</BlockTitle>
        <List noHairlinesMd>
          <ListInput label="Name" floatingLabel type="text" placeholder="Your name" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="Password"
            floatingLabel
            type="password"
            placeholder="Your password"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="E-mail"
            floatingLabel
            type="email"
            placeholder="Your e-mail"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="URL" floatingLabel type="url" placeholder="URL" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="Phone"
            floatingLabel
            type="tel"
            placeholder="Your phone number"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput label="Resizable" floatingLabel type="textarea" resizable placeholder="Bio">
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        <BlockTitle>Floating Labels + Outline Inputs</BlockTitle>
        <List noHairlinesMd>
          <ListInput
            outline
            label="Name"
            floatingLabel
            type="text"
            placeholder="Your name"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput
            outline
            label="Password"
            floatingLabel
            type="password"
            placeholder="Your password"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput
            outline
            label="E-mail"
            floatingLabel
            type="email"
            placeholder="Your e-mail"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput outline label="URL" floatingLabel type="url" placeholder="URL" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput
            outline
            label="Phone"
            floatingLabel
            type="tel"
            placeholder="Your phone number"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput
            outline
            label="Bio"
            floatingLabel
            type="textarea"
            resizable
            placeholder="Bio"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        <BlockTitle>Validation + Additional Info</BlockTitle>
        <List noHairlinesMd>
          <ListInput
            label="Name"
            type="text"
            placeholder="Your name"
            info="Default validation"
            required
            validate
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="Fruit"
            type="text"
            placeholder="Type 'apple' or 'banana'"
            required
            validate
            pattern="apple|banana"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
            <span slot="info">
              Pattern validation (<b>apple|banana</b>)
            </span>
          </ListInput>

          <ListInput
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            info="Default e-mail validation"
            required
            validate
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="URL"
            type="url"
            placeholder="Your URL"
            info="Default URL validation"
            required
            validate
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput
            label="Number"
            type="text"
            placeholder="Enter number"
            info="With custom error message"
            errorMessage="Only numbers please!"
            required
            validate
            pattern="[0-9]*"
            clearButton
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        <BlockTitle>Icon + Input</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Your name" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput type="password" placeholder="Your password" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput type="email" placeholder="Your e-mail" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>

          <ListInput type="url" placeholder="URL" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        <BlockTitle>Label + Input</BlockTitle>
        <List noHairlinesMd>
          <ListInput label="Name" type="text" placeholder="Your name" clearButton />

          <ListInput label="Password" type="password" placeholder="Your password" clearButton />

          <ListInput label="E-mail" type="email" placeholder="Your e-mail" clearButton />

          <ListInput label="URL" type="url" placeholder="URL" clearButton />
        </List>

        <BlockTitle>Only Inputs</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Your name" clearButton />

          <ListInput type="password" placeholder="Your password" clearButton />

          <ListInput type="email" placeholder="Your e-mail" clearButton />

          <ListInput type="url" placeholder="URL" clearButton />
        </List>

        <BlockTitle>Inputs + Additional Info</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Your name" info="Full name please" clearButton />

          <ListInput
            type="password"
            placeholder="Your password"
            info="8 characters minimum"
            clearButton
          />

          <ListInput
            type="email"
            placeholder="Your e-mail"
            info="Your work e-mail address"
            clearButton
          />

          <ListInput type="url" placeholder="URL" info="Your website URL" clearButton />
        </List>

        <BlockTitle>Only Inputs Inset</BlockTitle>
        <List inset>
          <ListInput type="text" placeholder="Your name" clearButton />

          <ListInput type="password" placeholder="Your password" clearButton />

          <ListInput type="email" placeholder="Your e-mail" clearButton />

          <ListInput type="url" placeholder="URL" clearButton />
        </List>
      </Page>
    </View>
  </App>
);
