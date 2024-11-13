import { QaDetailComponent } from './pages/qa-requests/qa-detail/qa-detail.component';
import { Routes } from '@angular/router';

// dashboard
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import { PaymentComponent } from './pages/payment/payment.component';
import { CoverLoginComponent } from './auth/cover-login';
import { LoginComponent } from './auth/login/login.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { LoginGuard } from './guards/login.guard';
import { QaRequestsComponent } from './pages/qa-requests/qa-requests.component';
import { LongTermRequestsComponent } from './pages/long-term-requests/long-term-requests.component';

export const routes: Routes = [
   
    {path:'login',component:LoginComponent, title:'ASAP | Login', canActivate:[LoginGuard]},
    {
        path: '',
        component: AppLayout,
        canActivate:[DashboardGuard],
        children: [
            // dashboard
            { path: '', redirectTo:'dashboard',pathMatch:'full' },

            { path: 'dashboard', component: DashboardComponent, title: 'ASAP Admin | Dashboard' },
            { path: 'students', loadChildren: () => import('./pages/students/students.module').then((d) => d.StudentsModule)},
            { path: 'tutors', loadChildren: () => import('./pages/tutors/tutors.module').then((d) => d.TutorsModule)},
            { path: 'withdraw-requests',loadChildren:()=> import('./pages/withdraw-requests/withdraw-requests.module').then((d)=>d.WithdrawRequestsModule) },
            { path: 'notifications',loadChildren:()=> import('./pages/notification/notification.component.module').then((d)=>d.NotificationModule) },
            {path:'qa-requests', component: QaRequestsComponent},
            {path:'long-term-requests', component:LongTermRequestsComponent},
            {path:'qa-requests/:id/students/:uid', component: QaDetailComponent},

            //apps
            { path: '', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

            // widgets
            { path: 'widgets', component: WidgetsComponent, title: 'Widgets | VRISTO - Multipurpose Tailwind Dashboard Template' },

            // components
            { path: '', loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },

            // elements
            { path: '', loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },

            // forms
            { path: '', loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },

            // users
            { path: '', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },

            // tables
            { path: 'tables', component: TablesComponent, title: 'Tables | VRISTO - Multipurpose Tailwind Dashboard Template' },
            { path: '', loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },

            // font-icons
            { path: 'font-icons', component: FontIconsComponent, title: 'Font Icons | VRISTO - Multipurpose Tailwind Dashboard Template' },

            // charts
            { path: 'charts', component: ChartsComponent, title: 'Charts | VRISTO - Multipurpose Tailwind Dashboard Template' },

            // dragndrop
            { path: 'dragndrop', component: DragndropComponent, title: 'Dragndrop | VRISTO - Multipurpose Tailwind Dashboard Template' },

            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, title: 'Knowledge Base | VRISTO - Multipurpose Tailwind Dashboard Template' },
            { path: 'pages/faq', component: FaqComponent, title: 'FAQ | VRISTO - Multipurpose Tailwind Dashboard Template' },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];
