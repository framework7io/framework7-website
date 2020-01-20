
<App>
  <View main>
    <Page>
      <Navbar title="Menu" />

      <BlockTitle>Plain Links</BlockTitle>
      <Menu>
        <MenuItem href="#" text="Item 1" />
        <MenuItem href="#" text="Item 2" />
        <MenuItem href="#" iconF7="pencil" />
        <MenuItem href="#" iconF7="square_arrow_up" />
      </Menu>

      <BlockTitle>Dropdowns</BlockTitle>
      <Menu>
        <MenuItem text="Left" dropdown>
          <MenuDropdown left>
            <MenuDropdownItem href="#" text="Menu Item 1" />
            <MenuDropdownItem href="#" text="Menu Item 2" />
            <MenuDropdownItem href="#" text="Menu Item 3" />
            <MenuDropdownItem href="#" text="Menu Item 4" />
            <MenuDropdownItem divider />
            <MenuDropdownItem href="#" text="Menu Item 5" />
            <MenuDropdownItem href="#" text="Menu Item 6" />
          </MenuDropdown>
        </MenuItem>

        <MenuItem text="Center" dropdown>
          <MenuDropdown center contentHeight="200px">
            <MenuDropdownItem href="#" text="Menu Item 1" />
            <MenuDropdownItem href="#" text="Menu Item 2" />
            <MenuDropdownItem href="#" text="Menu Item 3" />
            <MenuDropdownItem href="#" text="Menu Item 4" />
            <MenuDropdownItem divider />
            <MenuDropdownItem href="#" text="Menu Item 5" />
            <MenuDropdownItem href="#" text="Menu Item 6" />
            <MenuDropdownItem href="#" text="Menu Item 7" />
            <MenuDropdownItem divider />
            <MenuDropdownItem href="#" text="Menu Item 8" />
            <MenuDropdownItem href="#" text="Menu Item 9" />
            <MenuDropdownItem href="#" text="Menu Item 10" />
          </MenuDropdown>
        </MenuItem>

        <MenuItem text="Right" dropdown>
          <MenuDropdown right>
            <MenuDropdownItem href="#" text="Menu Item 1" />
            <MenuDropdownItem href="#" text="Menu Item 2" />
            <MenuDropdownItem href="#" text="Menu Item 3" />
            <MenuDropdownItem href="#" text="Menu Item 4" />
            <MenuDropdownItem divider />
            <MenuDropdownItem href="#" text="Menu Item 5" />
            <MenuDropdownItem href="#" text="Menu Item 6" />
          </MenuDropdown>
        </MenuItem>

        <MenuItem style="margin-left: auto" iconF7="square_arrow_up" dropdown>
          <MenuDropdown right>
            <MenuDropdownItem href="#">
              <span>Share on Facebook</span>
              <Icon class="margin-left" f7="logo_facebook" />
            </MenuDropdownItem>
            <MenuDropdownItem href="#">
              <span>Share on Twitter</span>
              <Icon class="margin-left" f7="logo_twitter" />
            </MenuDropdownItem>
          </MenuDropdown>
        </MenuItem>

        <MenuItem href="#" iconF7="pencil" />
      </Menu>
    </Page>
  </View>
</App>

<script>
  import {App, View, Page, Navbar, BlockTitle, Menu, MenuItem, MenuDropdown, MenuDropdownItem, Icon} from 'framework7-svelte';
</script>
