import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';
import { PermissionTypes } from 'src/app/types/entity-types';
import { UserService } from 'src/app/services/users.service';
import { GuildService } from 'src/app/services/guild.service';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.css'],
})
export class SettingsSidebarComponent {
  @Input() public tabType: TabType;
  @Input('id') public guildId: string;

  public readonly tabs: Tabs = {
    guild: [
      {
        name: 'General', 
        icon: 'fas fa-eye', 
        href: () => `/channels/${this.guildId}/settings`,
        permission: PermissionTypes.General.MANAGE_GUILD, 
      },
      // {
      //   name: 'Bots',
      //   icon: 'fas fa-robot',
      //   href: () => `/channels/${this.guildId}/bots`,
      //   permission: PermissionTypes.General.MANAGE_GUILD, 
      // },
      {
        name: 'Invites',
        icon: 'fas fa-user-plus',
        href: () => `/channels/${this.guildId}/invites`,
        permission: PermissionTypes.General.MANAGE_GUILD, 
      },
      {
        name: 'Roles',
        icon: 'fas fa-at',
        href: () => `/channels/${this.guildId}/roles`,
        permission: PermissionTypes.General.MANAGE_ROLES, 
      },
    ],
    user: [
      { name: 'Overview', icon: 'fas fa-eye', href: () => '/channels/@me/settings' },
      { name: 'Account', icon: 'fas fa-lock', href: () => '/channels/@me/settings/account' },
    ],
  };

  public get categories() {
    return Object.keys(this.tabs);
  }

  public get tabCategory() {
    return (this.tabType === 'guild')
      ? this.guildService.getCached(this.guildId)?.name
      : this.userService.self.username;
  }

  constructor(
    private guildService: GuildService,
    private perms: PermissionsService,
    private router: Router,
    private userService: UserService,
  ) {
    document.body.onkeyup = ({ key }) => {
      if (key === 'Escape')
        this.close();
    };
  }

  public async close() {
    await this.router.navigate([`/channels/${this.guildId ?? '@me'}`]);
  }

  public canAccess(tab: Tab) {
    return !tab.permission || this.perms.can(this.guildId, tab.permission);
  }
}

export type TabType = 'guild' | 'user';
export interface Tab {
  icon: string;
  href: (id: string) => string;
  name: string;
  permission?: PermissionTypes.Permission;
}
type Tabs = { [k in TabType]: Tab[] };