import ReactGA from 'react-ga4';

/**
 * Helper to safely track events with ReactGA
 * @param {string} action - Event name (e.g. 'copy_to_clipboard', 'font_select')
 * @param {object} params - Event parameters
 */
export function trackEvent(action, params = {}) {
  try {
    ReactGA.event({
      category: params.category || 'User_Action',
      action,
      ...params,
    });
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[Analytics] Failed to track event:', action, params, err);
    }
  }
}

/**
 * Track route change pageview
 * @param {string} path - URL path (pathname + search)
 * @param {string} title - Page title
 */
export function trackPageView(path, title) {
  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[Analytics] Failed to send pageview:', path, err);
    }
  }
}

/**
 * Standardized Event Trackers for Pon-Sar-Yay
 */

// 1. Export & Sharing
export function trackCopyClipboard(format = 'png', multiplier = 1) {
  trackEvent('copy_to_clipboard', {
    category: 'Conversion',
    format,
    multiplier,
  });
}

export function trackNativeShare(format = 'png', multiplier = 1) {
  trackEvent('share_click', {
    category: 'Conversion',
    method: 'web_share_api',
    format,
    multiplier,
  });
}

export function trackImageDownload(filename, format = 'png', multiplier = 1) {
  trackEvent('image_download_click', {
    category: 'Conversion',
    label: filename || 'edited-image',
    format,
    multiplier,
  });
}

// 2. Editor Creation
export function trackImageUpload(fileType, fileSizeKb) {
  trackEvent('image_upload', {
    category: 'Editor',
    file_type: fileType,
    file_size_kb: fileSizeKb,
  });
}

export function trackFontSelect(fontId, fontName, category) {
  trackEvent('font_select', {
    category: 'Editor',
    font_id: fontId,
    font_name: fontName,
    font_category: category,
  });
}

export function trackFontSearch(searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return;
  trackEvent('font_search', {
    category: 'Editor',
    search_term: searchTerm.trim().toLowerCase(),
  });
}

export function trackImageCrop(aspectPreset) {
  trackEvent('image_crop_apply', {
    category: 'Editor',
    aspect_preset: aspectPreset || 'free',
  });
}

export function trackShadowPreset(preset) {
  trackEvent('shadow_preset_apply', {
    category: 'Editor',
    preset,
  });
}

export function trackAddText() {
  trackEvent('add_text_layer', {
    category: 'Editor',
  });
}

// 3. User Preferences & Navigation
export function trackHeroCtaClick(source = 'landing_hero') {
  trackEvent('hero_cta_click', {
    category: 'Navigation',
    source,
  });
}

export function trackLanguageChange(newLang) {
  trackEvent('language_change', {
    category: 'Preferences',
    to_language: newLang,
  });
}

export function trackThemeToggle(newTheme) {
  trackEvent('theme_toggle', {
    category: 'Preferences',
    to_theme: newTheme,
  });
}
