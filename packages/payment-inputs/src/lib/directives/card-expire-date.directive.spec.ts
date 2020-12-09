import { ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import { CardExpireDateDirective } from './card-expire-date.directive';

describe('CardExpireDateDirective', () => {
  let directive: RenderResult<CardExpireDateDirective>;
  beforeEach(async () => {
    directive = await render(CardExpireDateDirective, {
      imports: [ReactiveFormsModule],
      template: `<input jstCardNumber placeholder="card">`,
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
