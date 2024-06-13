## Notes - Lukas Benneberg


## Automatisera utvecklingsprocessen för ren och väl dokumenterad kod av hög kvalitet.

Genom att använda följande verktyg och steg kan man automatisera flera delar av sitt arbetsflöde, vilket sparar tid och minskar risken för manuella fel. 
Att integrera dessa verktyg i utvecklingsprocessen hjälper till att hålla koden ren, väl dokumenterad och av hög kvalitet.
1. Automatisk Koddokumentation med Compodoc
2. Automatisk Testning med Karma och Jasmine
3. Automatisk Linting med TSLint (eller ESLint)
4. Kontinuerlig Integration (CI) med GitHub Actions
5. Automatisk Formatering med Prettier


## 1: Automatisk Koddokumentation med Compodoc

Compodoc är ett kraftfullt verktyg för att generera dokumentation för Angular-applikationer
1. Installera Compodoc:
`npm install --save-dev @compodoc/compodoc`
2. Lägg till ett dokumentationsskript i package.json:
"scripts": {
  "compodoc": "npx compodoc -p tsconfig.json -s"
}
3. Generera dokumentationen:
Kör följande kommando för att generera och serva dokumentationen:
`npm run compodoc`

## 2: Automatisk Testning med Karma och Jasmine

Angular CLI kommer förkonfigurerat med Karma och Jasmine för enhetstestning.
Skriv dina tester i *.spec.ts filer.
För att köra enhetstesterna, kör kommandot:
`ng test`

Detta kommer att starta Karma och köra dina testfall i en webbläsare eller headless beroende på konfigurationen. 
Se till att alla tester validerar för att säkerställa att dina komponenter fungerar korrekt. (Eller vad du vill testa)

Anpassa testerna baserat på din faktiska komponentstruktur och funktionalitet.
Lägg till fler tester för att täcka olika användarscenarier och gränssnittsbeteenden.
Utöka testerna för att omfatta även tjänster, formulärhantering och annan logik som finns i applikationen.
Genom att skriva och köra dessa enhetstester får man en ökad säkerhet i att applikationens logik och gränssnitt fungerar som förväntat, vilket bidrar till att minimera buggar och förbättra underhållsbarheten/uppdateringar på lång sikt.

Nedan följer två basic exempel utifrån denna app.

1. Sidebar Component Test (sidebar.component.spec.ts)
Här är ett exempel på hur man tex testar SidebarComponent i denna app. 
Testar om komponenten renderas korrekt. 
Testar om länkarna fungerar som förväntat.

sidebar.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items with correct router links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a.mat-list-item');

    expect(links.length).toBe(4); // Assuming there are 4 menu items
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Calendar');
    expect(links[2].textContent).toContain('Graphs');
    expect(links[3].textContent).toContain('Planning Tool');
  });

  // Add more tests as per your component functionality
});


2. Home Component Test (home.component.spec.ts)
Här är ett exempel på hur man kan testa HomeComponent i denna app. 
Testar om den initiala renderingen och textinnehållet visas korrekt:

home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ MatCardModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Welcome to Admin Dashboard');
    expect(compiled.querySelector('mat-card-content p').textContent).toContain('Here you can manage your application.');
  });

  // Add more tests as per your component functionality
});


## 3: Automatisk Linting med TSLint (eller ESLint)

Angular CLI använder TSLint för att säkerställa kodkvalitet.
1. Konfigurera TSLint:
TSLint konfiguration finns i tslint.json. Du kan justera reglerna enligt dina preferenser.
2. Kör linting:

## 4: Kontinuerlig Integration (CI) med GitHub Actions

GitHub Actions kan användas för att automatisera bygg-, test- och distributionsprocesser.
1. Skapa en .github/workflows mapp i ditt projekt.
2. Lägg till en ci.yml fil med följande innehåll:

name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run lint
      - run: npm run test -- --watch=false
      - run: npm run build -- --prod

## 5: Automatisk Formatering med Prettier

Prettier är ett verktyg för att automatiskt formatera din kod enligt en standardiserad stil.
1. Installera Prettier:
`npm install --save-dev prettier`

2. Skapa en .prettierrc fil för att konfigurera Prettier:
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
3. Lägg till ett formateringsskript i package.json:
"scripts": {
  "format": "prettier --write \"src/**/*.ts\""
}
4. Kör Prettier för att formatera din kod:
`npm run format`


## Implementera DevSecOps

Åtgärder för att förbättra säkerheten och förebygga incidenter som läckage av känslig information som tex .env-filer
1. Automatiserad kodgranskning:
2. Säkerhetskopplingsverktyg:
3. Automatiserad hantering av säkerhetsproblem:
4. Säkerhetsbästa praxis och riktlinjer:
5. Kontinuerlig utbildning och medvetenhet:
6. Automatiserad efterlevnad och övervakning:
7. Samarbete och kommunikation:

## 

Att skapa och distribuera dokumentation och checklista för säkerhetsbästa praxis kan vara till stor hjälp för att säkerställa att alla i projektet arbetar enligt samma standarder och riktlinjer. Detta kan också fungera som ett referensmaterial för nya teammedlemmar och bidra till att upprätthålla en enhetlig säkerhetskultur inom organisationen.

## Automatisera och säkerställa applikationens prestanda och generera loggar

Automatisera prestandamätning, loggning och övervakning för att identifiera och åtgärda prestandaproblem och felaktigheter i realtid och säkerställa en högkvalitativ och pålitlig användarupplevelse.

1. Prestandamätning och övervakning:
Använd verktyg som Prometheus, Grafana, New Relic eller Datadog för att övervaka och mäta applikationens prestanda i realtid. Dessa verktyg kan hjälpa dig att identifiera flaskhalsar och optimeringsmöjligheter samt ge insikter för att förbättra prestandan.

2. Automatiserade tester:
Implementera automatiserade tester för att kontinuerligt övervaka och säkerställa applikationens prestanda. Detta kan inkludera enhetstester, integrationstester och belastningstester för att identifiera prestandaproblem tidigt i utvecklingsprocessen.

3. Loggning och logganalys:
Konfigurera loggning i din applikation och använd verktyg som ELK Stack (Elasticsearch, Logstash, Kibana), Splunk eller Sumo Logic för att samla in, analysera och visualisera loggar. Detta gör det möjligt att identifiera fel, spåra problem och övervaka applikationsbeteende i realtid.

4. Centraliserad logghantering:
Säkerställ att loggar samlas in och hanteras på ett centraliserat sätt för att enkelt kunna söka, filtrera och analysera dem. Använd molntjänster eller dedikerade logghanteringsplattformar för att lagra och hantera loggar på ett effektivt sätt.

5. Loggrotation och retention:
Konfigurera loggrotation och retention för att hantera loggfilstorlek och bevara loggdata under önskad tidsperiod. Detta hjälper till att hantera utrymmeskrav och säkerställa att du har tillgång till historiska loggar för felsökning och efterlevnad.

6. Användningsanalys och spårning:
Implementera användningsanalys och spårning för att följa användarbeteende och identifiera mönster och trender. Detta kan hjälpa dig att optimera användarupplevelsen och identifiera potentiella förbättringsområden.







Skapa en ny AngularApp med AngularMaterial

ng new admin-dashboard-app
cd admin-dashboard-app

ng add @angular/material

Skapa Admin Dashboard Module och Components:

ng generate module admin-dashboard --routing
ng generate component admin-dashboard/sidebar
ng generate component admin-dashboard/home
ng generate component admin-dashboard/calendar
ng generate component admin-dashboard/graphs
ng generate component admin-dashboard/planning-tool

ConfKonfigurera admin-dashboard.module.ts. Inkludera Angular Material Modules och components.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { PlanningToolComponent } from './planning-tool/planning-tool.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    SidebarComponent,
    HomeComponent,
    CalendarComponent,
    GraphsComponent,
    PlanningToolComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class AdminDashboardModule { }


Modifiera admin-dashboard-routing.module.ts för att definera routes:
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


Skapa Sidebar Component:
Implementera sidebar.component.html med en sidebar menu och router outlet:

## html
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer class="sidenav" fixedInViewport>
    <mat-toolbar>Admin Dashboard</mat-toolbar>
    <mat-nav-list>
      <a mat-list-item [routerLink]="['/admin-dashboard']" (click)="drawer.toggle()">Home</a>
      <a mat-list-item [routerLink]="['/admin-dashboard/calendar']" (click)="drawer.toggle()">Calendar</a>
      <a mat-list-item [routerLink]="['/admin-dashboard/graphs']" (click)="drawer.toggle()">Graphs</a>
      <a mat-list-item [routerLink]="['/admin-dashboard/planning-tool']" (click)="drawer.toggle()">Planning Tool</a>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <mat-toolbar>
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Admin Dashboard</span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>


Skapa HomeComponent:
home.component.html för home page:

## html
<mat-card>
  <mat-card-title>Welcome to Admin Dashboard</mat-card-title>
  <mat-card-content>
    <p>Here you can manage your application.</p>
  </mat-card-content>
</mat-card>

Calendar, Graphs, och Planning Tool Components:
Simpel HTML markup för varje component man vill använda, som exempel i denna app (calendar.component.html, graphs.component.html, planning-tool.component.html).

Starta appen:

ng serve
Gå till http://localhost:4200/admin-dashboard för att kolla att allt fungerar. (porten (4200) är ju valfri att ändra såklart)









