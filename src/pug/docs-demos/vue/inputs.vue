<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Form Inputs"></f7-navbar>
        <div v-if="showPage">
        <f7-block-title>Full Layout / Inline Labels</f7-block-title>
        <f7-list inline-labels no-hairlines-md>
          <f7-list-input
            label="Name"
            type="text"
            placeholder="Your name"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Password"
            type="password"
            placeholder="Your password"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="URL"
            type="url"
            placeholder="URL"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Phone"
            type="tel"
            placeholder="Your phone number"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Gender"
            type="select"
            value="Male"
            placeholder="Please choose..."
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </f7-list-input>

          <f7-list-input
            label="Birthday"
            type="date"
            value="2014-04-30"
            placeholder="Please choose..."
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Date time"
            type="datetime-local"
            placeholder="Please choose..."
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Range"
            :input="false"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
            <template #input>
              <f7-range :value="50" :min="0" :max="100" :step="1"></f7-range>
            </template>
          </f7-list-input>

          <f7-list-input
            label="Textarea"
            type="textarea"
            placeholder="Bio"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Resizable"
            type="textarea"
            resizable
            placeholder="Bio"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
        </f7-list>

        <f7-block-title>Full Layout / Stacked Labels</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            label="Name"
            type="text"
            placeholder="Your name"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Password"
            type="password"
            placeholder="Your password"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="URL"
            type="url"
            placeholder="URL"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Phone"
            type="tel"
            placeholder="Your phone number"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Gender"
            type="select"
            value="Male"
            placeholder="Please choose..."
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </f7-list-input>

          <f7-list-input
            label="Birthday"
            type="date"
            value="2014-04-30"
            placeholder="Please choose..."
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Date time"
            type="datetime-local"
            placeholder="Please choose..."
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Range"
            :input="false"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
            <template #input>
              <f7-range :value="50" :min="0" :max="100" :step="1"></f7-range>
            </template>
          </f7-list-input>

          <f7-list-input
            label="Textarea"
            type="textarea"
            placeholder="Bio"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Resizable"
            type="textarea"
            resizable
            placeholder="Bio"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
        </f7-list>

        <f7-block-title>Date Pickers</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            label="Default setup"
            type="datepicker"
            placeholder="Your birth date"
            readonly
          ></f7-list-input>
          <f7-list-input
            label="Custom date format"
            type="datepicker"
            placeholder="Select date"
            readonly
            :calendar-params="{dateFormat: 'DD, MM dd, yyyy'}"
          ></f7-list-input>
          <f7-list-input
            label="Multiple Values"
            type="datepicker"
            placeholder="Select multiple dates"
            readonly
            :calendar-params="{ dateFormat: 'M dd yyyy', multiple: true }"
          ></f7-list-input>
          <f7-list-input
            label="Range Picker"
            type="datepicker"
            placeholder="Select date range"
            readonly
            :calendar-params="{ dateFormat: 'M dd yyyy', rangePicker: true }"
          ></f7-list-input>
          <f7-list-input
            label="Open in Modal"
            type="datepicker"
            placeholder="Select date"
            readonly
            :calendar-params="{openIn: 'customModal', header: true, footer: true, dateFormat: 'MM dd yyyy'}"
          ></f7-list-input>
        </f7-list>

        <f7-block-title>Color Pickers</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            type="colorpicker"
            label="Color Wheel"
            placeholder="Color"
            readonly
            :value="{ hex: '#00ff00' }"
          ></f7-list-input>
          <f7-list-input
            type="colorpicker"
            label="Saturation-Brightness Spectrum"
            placeholder="Color"
            readonly
            :value="{ hex: '#ff0000' }"
            :color-picker-params="{
              modules: ['sb-spectrum', 'hue-slider'],
            }"
          ></f7-list-input>

          <f7-list-input
            type="colorpicker"
            label="RGB Sliders"
            placeholder="Color"
            readonly
            :value="{ hex: '#0000ff' }"
            :color-picker-params="{
              modules: ['rgb-sliders'],
              sliderValue: true,
              sliderLabel: true,
            }"
          ></f7-list-input>

          <f7-list-input
            type="colorpicker"
            label="RGBA Sliders"
            placeholder="Color"
            readonly
            :value="{ hex: '#ff00ff' }"
            :color-picker-params="{
              modules: ['rgb-sliders', 'alpha-slider'],
              sliderValue: true,
              sliderLabel: true,
              formatValue(value) {
                return `rgba(${value.rgba.join(', ')})`;
              },
            }"
          ></f7-list-input>
          <f7-list-input
            type="colorpicker"
            label="HSB Sliders"
            placeholder="Color"
            readonly
            :value="{ hex: '#00ff00' }"
            :color-picker-params="{
              modules: ['hsb-sliders'],
              sliderValue: true,
              sliderLabel: true,
              formatValue(value) {
                return `hsb(${value.hsb[0]}, ${value.hsb[1] * 1000 / 10}%, ${value.hsb[2] * 1000 / 10}%)`
              },
            }"
          ></f7-list-input>
          <f7-list-input
            type="colorpicker"
            label="RGB Bars"
            placeholder="Color"
            readonly
            :value="{ hex: '#0000ff' }"
            :color-picker-params="{
              modules: ['rgb-bars'],
              openIn: 'auto',
              barValue: true,
              barLabel: true,
              formatValue(value) {
                return `rgb(${value.rgb.join(', ')})`;
              },
            }"
          ></f7-list-input>
          <f7-list-input
            type="colorpicker"
            label="RGB Sliders + Colors"
            placeholder="Color"
            readonly
            :value="{ hex: '#ffff00' }"
            :color-picker-params="{
              modules: ['initial-current-colors', 'rgb-sliders'],
              sliderValue: true,
              sliderLabel: true,
              formatValue(value) {
                return `rgb(${value.rgb.join(', ')})`;
              },
            }"
          ></f7-list-input>
          <f7-list-input
            type="colorpicker"
            label="Palette"
            placeholder="Color"
            readonly
            :value="{ hex: '#FFEBEE' }"
            :color-picker-params="{
              modules: ['palette'],
              openIn: 'auto',
              openInPhone: 'sheet',
              palette: [
                ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
                ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
                ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
                ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
                ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
                ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
                ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
                ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
              ],
              formatValue(value) {
                return value.hex;
              },
            }"
          ></f7-list-input>
          <f7-list-input
            type="colorpicker"
            label="Pro Mode"
            placeholder="Color"
            readonly
            :value="{ hex: '#00ffff' }"
            :color-picker-params="{
              modules: ['initial-current-colors', 'sb-spectrum', 'hsb-sliders', 'rgb-sliders', 'alpha-slider', 'hex', 'palette'],
              openIn: 'auto',
              sliderValue: true,
              sliderValueEditable: true,
              sliderLabel: true,
              hexLabel: true,
              hexValueEditable: true,
              groupedModules: true,
              palette: [
                ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
                ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
                ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
                ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
                ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
                ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
                ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
                ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
              ],
              formatValue(value) {
                return `rgba(${value.rgba.join(', ')})`;
              },
            }"
          ></f7-list-input>
        </f7-list>

        <f7-block-title>Floating Labels</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            label="Name"
            floating-label
            type="text"
            placeholder="Your name"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Password"
            floating-label
            type="password"
            placeholder="Your password"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="E-mail"
            floating-label
            type="email"
            placeholder="Your e-mail"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="URL"
            floating-label
            type="url"
            placeholder="URL"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Phone"
            floating-label
            type="tel"
            placeholder="Your phone number"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Resizable"
            floating-label
            type="textarea"
            resizable
            placeholder="Bio"
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
        </f7-list>

        <f7-block-title>Floating Labels + Outline Inputs</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            outline
            label="Name"
            floating-label
            type="text"
            placeholder="Your name"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
          <f7-list-input
            outline
            label="Password"
            floating-label
            type="password"
            placeholder="Your password"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
          <f7-list-input
            outline
            label="E-mail"
            floating-label
            type="email"
            placeholder="Your e-mail"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
          <f7-list-input
            outline
            label="URL"
            floating-label
            type="url"
            placeholder="URL"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
          <f7-list-input
            outline
            label="Phone"
            floating-label
            type="tel"
            placeholder="Your phone number"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
          <f7-list-input
            outline
            label="Bio"
            floating-label
            type="textarea"
            resizable
            placeholder="Bio"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
        </f7-list>

        <f7-block-title>Validation + Additional Info</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            label="Name"
            type="text"
            placeholder="Your name"
            info="Default validation"
            required
            validate
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Fruit"
            type="text"
            placeholder="Type 'apple' or 'banana'"
            required
            validate
            pattern="apple|banana"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
            <template #info>
              <span>Pattern validation (<b>apple|banana</b>)</span>
            </template>
          </f7-list-input>

          <f7-list-input
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            info="Default e-mail validation"
            required
            validate
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="URL"
            type="url"
            placeholder="Your URL"
            info="Default URL validation"
            required
            validate
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            label="Number"
            type="text"
            placeholder="Enter number"
            info="With custom error message"
            error-message="Only numbers please!"
            required
            validate
            pattern="[0-9]*"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>
        </f7-list>

        <f7-block-title>Icon + Input</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            type="text"
            placeholder="Your name"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            type="password"
            placeholder="Your password"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            type="email"
            placeholder="Your e-mail"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

          <f7-list-input
            type="url"
            placeholder="URL"
            clear-button
          >
            <template #media>
              <f7-icon icon="demo-list-icon" />
            </template>
          </f7-list-input>

        </f7-list>

        <f7-block-title>Label + Input</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            label="Name"
            type="text"
            placeholder="Your name"
            clear-button
          ></f7-list-input>

          <f7-list-input
            label="Password"
            type="password"
            placeholder="Your password"
            clear-button
          ></f7-list-input>

          <f7-list-input
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            clear-button
          ></f7-list-input>

          <f7-list-input
            label="URL"
            type="url"
            placeholder="URL"
            clear-button
          ></f7-list-input>
        </f7-list>

        <f7-block-title>Only Inputs</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            type="text"
            placeholder="Your name"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="password"
            placeholder="Your password"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="email"
            placeholder="Your e-mail"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="url"
            placeholder="URL"
            clear-button
          ></f7-list-input>
        </f7-list>

        <f7-block-title>Inputs + Additional Info</f7-block-title>
        <f7-list no-hairlines-md>
          <f7-list-input
            type="text"
            placeholder="Your name"
            info="Full name please"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="password"
            placeholder="Your password"
            info="8 characters minimum"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="email"
            placeholder="Your e-mail"
            info="Your work e-mail address"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="url"
            placeholder="URL"
            info="Your website URL"
            clear-button
          ></f7-list-input>
        </f7-list>

        <f7-block-title>Only Inputs Inset</f7-block-title>
        <f7-list inset>
          <f7-list-input
            type="text"
            placeholder="Your name"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="password"
            placeholder="Your password"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="email"
            placeholder="Your e-mail"
            clear-button
          ></f7-list-input>

          <f7-list-input
            type="url"
            placeholder="URL"
            clear-button
          ></f7-list-input>
        </f7-list>
        </div>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
<style>
  .demo-list-icon {
    background: #ccc;
    display: block;
    position: relative;
  }
  .ios .demo-list-icon, .ios .icon-f7, .ios .icon-vi {
    width: 29px;
    height: 29px;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .md .demo-list-icon, .md .icon-f7, .md .icon-vi {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
  .aurora .demo-list-icon, .aurora .icon-f7, .aurora .icon-vi {
    width: 18px;
    height: 18px;
    border-radius: 4px;
  }
</style>
<script>
  export default {
    data() {
      return {
        showPage: false,
      };
    },
    mounted() {
      const self = this;
      setTimeout(()=>{
        self.showPage = true;
      },0);
    },
  }
</script>
