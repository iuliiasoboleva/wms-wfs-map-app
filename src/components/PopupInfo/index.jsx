import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Overlay from 'ol/Overlay';
import styles from './PopupInfo.module.css';

const PopupInfo = ({ map, feature, position, onClose }) => {
  const containerRef = useRef(document.createElement('div'));
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const overlay = new Overlay({
      element: containerRef.current,
      positioning: 'bottom-center',
      stopEvent: true,
      offset: [0, -10],
    });

    map.addOverlay(overlay);
    overlay.setPosition(position);
    overlayRef.current = overlay;

    return () => {
      if (map && overlayRef.current) {
        try {
          map.removeOverlay(overlayRef.current);
        } catch {
        }
        overlayRef.current = null;
      }
    };
  }, [map]);

  useEffect(() => {
    if (overlayRef.current && position) {
      overlayRef.current.setPosition(position);
    }
  }, [position]);

  if (!feature) return null;

  const popupContent = (
    <div className={styles.popup}>
      <div className={styles.header}>
        <span>Атрибуты объекта</span>
        <button onClick={onClose} className={styles.close}>
          ✕
        </button>
      </div>

      <div className={styles.content}>
        {feature['WMS Response'] ? (
          <div
            className={styles.htmlContent}
            dangerouslySetInnerHTML={{ __html: feature['WMS Response'] }}
          />
        ) : (
          Object.entries(feature).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(popupContent, containerRef.current);
};

export default PopupInfo;
