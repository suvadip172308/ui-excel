import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './routes/router';

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
