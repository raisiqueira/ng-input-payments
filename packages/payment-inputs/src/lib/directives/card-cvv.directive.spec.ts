import { ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import { CardCvvDirective } from './card-cvv.directive';

describe('CardCvvDirective', () => {
  let directive: RenderResult<CardCvvDirective>;
  beforeEach(async () => {
    directive = await render(CardCvvDirective, {
      imports: [ReactiveFormsModule],
      template: `<input jstCardNumber placeholder="card">`,
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
