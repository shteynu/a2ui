/*
 * Copyright 2026 Google LLC
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

import {TestBed} from '@angular/core/testing';

import {SanitizerMarkdownRendererService} from './sanitizer-markdown-renderer-service';

describe('SanitizerMarkdownRendererService', () => {
  let service: SanitizerMarkdownRendererService;

  beforeEach(() => {
    service = TestBed.runInInjectionContext(() => new SanitizerMarkdownRendererService());
  });

  it('should strip event handlers and scripts', async () => {
    const html = await service.render(
      '<img src="x" onerror="alert(1)"><script>alert(2)</script>hello',
    );

    expect(typeof html).toBe('string');
    expect(html as string).toContain('hello');
    expect(html as string).not.toContain('onerror');
    expect(html as string).not.toContain('<script');
  });

  it('should keep safe HTML', async () => {
    const html = await service.render('<b>bold</b> and <a href="https://example.com">link</a>');

    expect(html as string).toBe('<b>bold</b> and <a href="https://example.com">link</a>');
  });
});
