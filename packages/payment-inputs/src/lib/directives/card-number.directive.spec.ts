import { ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import { CardNumberDirective } from './card-number.directive';

describe('CardNumberDirective', () => {
  let directive: RenderResult<CardNumberDirective>;
  beforeEach(async () => {
    directive = await render(CardNumberDirective, {
      imports: [ReactiveFormsModule],
      template: `<input jstCardNumber placeholder="card">`,
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
