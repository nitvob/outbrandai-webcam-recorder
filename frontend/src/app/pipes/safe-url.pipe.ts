/**
 * safe-url.pipe.ts
 *
 * This file defines a custom Angular pipe named 'safeUrl', which is used to sanitize URLs to be
 * safely used in the application, particularly for resource URLs that need to be embedded in
 * templates, such as video sources, iframes, etc. This pipe leverages Angular's DomSanitizer
 * service to bypass security checks for URLs, marking them as safe for use in Angular templates.
 *
 * The primary use case for this pipe is to prevent Angular's automatic sanitization from blocking
 * URLs that are dynamically bound to elements such as <iframe>, <embed>, or <video>, ensuring that
 * these elements can load their content without running into security policy violations.
 *
 * Dependencies:
 * - @angular/core: Provides the Pipe and PipeTransform interface for defining custom pipes.
 * - @angular/platform-browser: Provides the DomSanitizer service, which is used to sanitize
 *   potentially unsafe values such as URLs.
 *
 * Usage:
 * To use this pipe in an Angular template, apply it to a URL binding within an element property that
 * expects a URL, such as the 'src' attribute of an <iframe> or <video> tag.
 *
 * Example usage in an Angular component template:
 *
 * ```html
 * <iframe [src]="videoUrl | safeUrl"></iframe>
 * ```
 *
 * Here, `videoUrl` is a component property that holds the URL to be loaded in the <iframe>. The
 * `safeUrl` pipe is applied to ensure that the URL is sanitized and marked safe, bypassing Angular's
 * strict security checks.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Defines a custom pipe named 'safeUrl'.
 */
@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  /**
   * Injects Angular's DomSanitizer service to perform URL sanitization.
   *
   * @param sanitizer The DomSanitizer service instance.
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Transforms the given URL into a SafeResourceUrl, bypassing Angular's security checks.
   *
   * @param url The URL to be transformed and sanitized.
   * @returns A SafeResourceUrl that can be safely used in the application.
   */
  transform(url: string): SafeResourceUrl {
    // Use the sanitizer to bypass security checks for the given URL, marking it as safe.
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
