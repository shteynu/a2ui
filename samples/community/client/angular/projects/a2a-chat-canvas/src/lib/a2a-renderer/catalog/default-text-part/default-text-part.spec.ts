/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultTextPart} from './default-text-part';

describe('DefaultTextPart', () => {
  let component: DefaultTextPart;
  let fixture: ComponentFixture<DefaultTextPart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultTextPart],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultTextPart);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('uiMessageContent', {
      type: 'ui_message_content',
      id: 'test-id',
      data: {
        kind: 'text',
        text: 'test text',
      },
      variant: 'default_text_part',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render event handlers or scripts from agent text', async () => {
    fixture.componentRef.setInput('uiMessageContent', {
      type: 'ui_message_content',
      id: 'test-id',
      data: {
        kind: 'text',
        text: '<img src="x" onerror="alert(1)"><script>alert(2)</script>hello',
      },
      variant: 'default_text_part',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.textContent).toContain('hello');
    expect(host.querySelector('img')?.hasAttribute('onerror') ?? false).toBe(false);
    expect(host.querySelector('script')).toBeNull();
  });
});
