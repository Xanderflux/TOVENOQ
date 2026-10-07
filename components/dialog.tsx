"use client";

import { useEffect, useRef, useState } from "react";

export function Dialog({
  title,
  drawer = false,
  onClose,
  children,
}: {
  title: string;
  drawer?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    const timer = window.setTimeout(onClose, 180);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const content = document.getElementById("site-content");
    const oldOverflow = document.body.style.overflow;
    content?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    // Removing or disabling the focused control must not leave focus on body.
    const keepFocusInPanel = () => {
      const active = document.activeElement;
      if (!panelRef.current?.contains(active) ||
          (active instanceof HTMLElement && active.matches(":disabled"))) {
        closeRef.current?.focus();
      }
    };
    const observer = new MutationObserver(keepFocusInPanel);
    if (panelRef.current) {
      observer.observe(panelRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["disabled"],
      });
    }
    document.addEventListener("focusin", keepFocusInPanel);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setClosing(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", keepFocusInPanel);
      document.removeEventListener("keydown", onKeyDown);
      content?.removeAttribute("inert");
      document.body.style.overflow = oldOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <div className={`overlay ${drawer ? "overlay--drawer" : ""}${closing ? " overlay--closing" : ""}`}>
      <button
        className="overlay-dismiss"
        aria-label={`Close ${title.toLowerCase()}`}
        onClick={() => setClosing(true)}
      />
      <div
        className={
          drawer ? "dialog-panel dialog-panel--drawer" : "dialog-panel"
        }
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
      >
        <button
          className="close-button"
          aria-label={`Close ${title.toLowerCase()}`}
          onClick={() => setClosing(true)}
          ref={closeRef}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
