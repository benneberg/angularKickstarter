import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { PlanningToolComponent } from './planning-tool/planning-tool.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: 'planning-tool', component: PlanningToolComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
