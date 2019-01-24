import {
  extensionsRoutes,
  FeatureExtensionsModule
} from '@angular-console/feature-extensions';
import {
  FeatureGenerateModule,
  generateRoutes
} from '@angular-console/feature-generate';
import {
  FeatureDeployModule,
  deployRoutes
} from '@angular-console/feature-deploy';
import { FeatureRunModule, runRoutes } from '@angular-console/feature-run';
import { UiModule } from '@angular-console/ui';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';

import { NewWorkspaceComponent } from './new-workspace/new-workspace.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import {
  connectWorkspaceRoutes,
  connectRootRoutes
} from '@nrwl/angular-console-enterprise-frontend';
import { settingsRoutes } from '@angular-console/feature-settings';

export type FeatureWorkspaceRouteState =
  | 'workspaces'
  | 'create-workspace'
  | 'workspace';

export const WORKSPACES: FeatureWorkspaceRouteState = 'workspaces';
export const CREATE_WORKSPACE: FeatureWorkspaceRouteState = 'create-workspace';
export const WORKSPACE: FeatureWorkspaceRouteState = 'workspace';

export const workspaceRoutes: Route[] = [
  {
    path: 'workspaces',
    component: WorkspacesComponent,
    data: { state: WORKSPACES }
  },
  {
    path: 'create-workspace',
    component: NewWorkspaceComponent,
    data: { state: CREATE_WORKSPACE }
  },
  {
    path: 'workspace/:path',
    component: WorkspaceComponent,
    data: { state: WORKSPACE },
    children: [
      {
        data: { state: 'projects' },
        path: 'projects',
        component: ProjectsComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'projects' },
      {
        data: { state: 'deploy' },
        path: 'deploy',
        children: deployRoutes
      },
      {
        data: { state: 'extensions' },
        path: 'extensions',
        children: extensionsRoutes
      },
      {
        data: { state: 'generate' },
        path: 'generate',
        children: generateRoutes
      },
      { data: { state: 'tasks' }, path: 'tasks', children: runRoutes },
      {
        path: 'connect',
        children: connectRootRoutes
      },
      { path: 'settings', children: settingsRoutes },
      ...connectWorkspaceRoutes
    ]
  }
];

@NgModule({
  imports: [
    MatDialogModule,
    RouterModule,
    FeatureDeployModule,
    FeatureExtensionsModule,
    FeatureGenerateModule,
    FeatureRunModule,
    ReactiveFormsModule,
    UiModule
  ],
  declarations: [
    ProjectsComponent,
    NewWorkspaceComponent,
    WorkspaceComponent,
    WorkspacesComponent
  ],
  entryComponents: [NewWorkspaceComponent]
})
export class FeatureWorkspacesModule {}
