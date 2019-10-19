import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { SpinnerConfig } from '../../models/common.model';
import { SPINNER_DEFAULT_CONFIG } from '../../shared/const/conts';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  overlayRef: OverlayRef;

  constructor(
    public overlay: Overlay
  ) { };
  
  private createOverlay(config: SpinnerConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: SpinnerConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  open(config: SpinnerConfig = {}) {
    const dialogConfig = { ...SPINNER_DEFAULT_CONFIG, ...config };

    this.overlayRef = this.createOverlay(dialogConfig);
    const spinnerPortal = new ComponentPortal(SpinnerComponent);
    this.overlayRef .attach(spinnerPortal);

    return this.overlayRef ;
  }

  close(): void {
    this.overlayRef.dispose();
  }
}
