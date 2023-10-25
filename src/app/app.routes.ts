import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

const APP_ROUTES: Routes = [
    { path: 'template', component: TemplateComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: "**", pathMatch: "full", redirectTo:'template' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);