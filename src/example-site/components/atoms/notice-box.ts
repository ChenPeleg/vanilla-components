import { BaseElement } from '../../../_core/elements/base-element.ts';
import { SiteColors } from '../../colors/siteColors.ts';


export class NoticeBox extends BaseElement {
    static get observedAttributes() {
        return ['variant', 'title', 'dismissible', 'icon'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', this.computeRole());
        this.setAttribute('tabindex', '0');
        this.update();

        // Close button handler (if present)
        this.shadowRoot?.addEventListener(
            'click',
            (e) => {
                const target = e.target as HTMLElement;
                if (target && target.closest('[data-dismiss]')) {
                    this.actionCallback({ type: 'notice-dismissed' });
                    this.setAttribute('aria-hidden', 'true');
                    this.style.display = 'none';
                }
            },
            { signal: this.abortSignal.signal }
        );
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        if (name === 'variant') {
            this.setAttribute('role', this.computeRole());
        }
        this.update();
    }

    protected update() {
        // Re-render to apply latest attributes/styles
        this.renderTemplate();
    }

    private computeRole(): string {
        const variant = (this.getAttribute('variant') || 'tip').toLowerCase();
        switch (variant) {
            case 'success':
                return 'status';
            case 'warning':
            case 'danger':
            case 'error':
                return 'alert';
            case 'info':
            case 'note':
            case 'tip':
            default:
                return 'note';
        }
    }

    private variantConfig() {
        const variant = (this.getAttribute('variant') || 'tip').toLowerCase();
        const map: Record<string, { bg: string; border: string; icon: string; label: string }> = {
            tip: {
                bg: 'bg-purple-50 dark:bg-purple-900/30',
                border: 'border-purple-500 dark:border-purple-400',
                icon: '💡',
                label: 'Tip',
            },
            info: {
                bg: 'bg-blue-50 dark:bg-blue-900/30',
                border: 'border-blue-500 dark:border-blue-400',
                icon: 'ℹ️',
                label: 'Info',
            },
            note: {
                bg: 'bg-slate-50 dark:bg-slate-800/40',
                border: 'border-slate-500 dark:border-slate-400',
                icon: '📝',
                label: 'Note',
            },
            success: {
                bg: 'bg-green-50 dark:bg-green-900/30',
                border: 'border-green-600 dark:border-green-400',
                icon: '✅',
                label: 'Success',
            },
            warning: {
                bg: 'bg-amber-50 dark:bg-amber-900/30',
                border: 'border-amber-500 dark:border-amber-400',
                icon: '⚠️',
                label: 'Warning',
            },
            danger: {
                bg: 'bg-red-50 dark:bg-red-900/30',
                border: 'border-red-600 dark:border-red-400',
                icon: '⛔',
                label: 'Danger',
            },
            error: {
                bg: 'bg-red-50 dark:bg-red-900/30',
                border: 'border-red-600 dark:border-red-400',
                icon: '⛔',
                label: 'Error',
            },
        };
        return map[variant] || map.tip;
    }

    renderTemplate() {
        const cfg = this.variantConfig();
        const title = this.getAttribute('title') || cfg.label;
        const dismissible = this.hasAttribute('dismissible');
        const iconAttr = this.getAttribute('icon');
        const icon = iconAttr === null ? cfg.icon : iconAttr; // allow override, set icon="" to hide

        this.shadowRoot!.innerHTML = `
            <div class="${cfg.bg} ${cfg.border} border-l-4 p-4 my-4 rounded-md outline-none">
                <div class="flex items-start gap-3">
                    ${icon ? `<span aria-hidden="true" class="text-lg leading-6">${icon}</span>` : ''}
                    <div class="flex-1">
                        <p class="font-bold mb-1 ${SiteColors.headerText}">${title}</p>
                        <div class="${SiteColors.textMain}">
                            <slot></slot>
                        </div>
                    </div>
                    ${
                        dismissible
                            ? `<button data-dismiss class="ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white" aria-label="Dismiss notification" title="Dismiss">✖</button>`
                            : ''
                    }
                </div>
            </div>
        `;
    }
}

customElements.define('notice-box', NoticeBox);

