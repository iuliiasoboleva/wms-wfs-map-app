import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import OSM from 'ol/source/OSM';
import ImageWMS from 'ol/source/ImageWMS';
import { defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import PopupInfo from '../PopupInfo';
import styles from './MapComponent.module.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  const WMS_URL = process.env.VITE_WMS_URL || 'http://zs.zulugis.ru:6473/ws?';
  const WMS_LAYER = process.env.VITE_WMS_LAYER || 'world:world';
  const WMS_VERSION = process.env.VITE_WMS_VERSION || '1.3.0';
  const USERNAME = process.env.VITE_USERNAME || 'mo';
  const PASSWORD = process.env.VITE_PASSWORD || 'mo';

  useEffect(() => {
    if (!WMS_URL) return;

    const osmLayer = new TileLayer({
      source: new OSM(),
      title: 'OpenStreetMap',
    });

    const wmsSource = new ImageWMS({
      url: WMS_URL,
      params: {
        LAYERS: WMS_LAYER,
        VERSION: WMS_VERSION,
        TILED: true,
      },
      ratio: 1,
      crossOrigin: 'anonymous',
      imageLoadFunction: (image, src) => {
        fetch(src, {
          headers: {
            Authorization: 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`),
          },
        })
          .then((res) => res.blob())
          .then((blob) => {
            image.getImage().src = URL.createObjectURL(blob);
          })
          .catch((err) => console.error('Ошибка загрузки WMS:', err));
      },
    });

    const wmsLayer = new ImageLayer({ source: wmsSource });

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [osmLayer, wmsLayer],
      view: new View({
        center: fromLonLat([37.6173, 55.7558]),
        zoom: 4,
      }),
      controls: defaultControls(),
    });

    mapInstance.on('click', (evt) => {
      setSelectedFeature(null);
      setPopupPosition(null);

      const view = mapInstance.getView();
      const resolution = view.getResolution();
      const projection = view.getProjection();

      const url = wmsLayer
        .getSource()
        .getFeatureInfoUrl(evt.coordinate, resolution, projection, {
          INFO_FORMAT: 'text/html',
          FEATURE_COUNT: 5,
        });

      if (!url) return;

      fetch(url, {
        headers: {
          Authorization: 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`),
        },
      })
        .then((r) => r.text())
        .then((text) => {
          if (!text || text.includes('Exception') || text.includes('<table></table>')) {
            setSelectedFeature({ Ошибка: 'Нет данных для выбранного участка' });
          } else {
            setSelectedFeature({ 'WMS Response': text });
          }
          setPopupPosition(evt.coordinate);
        })
        .catch((err) => console.error('Ошибка GetFeatureInfo:', err));
    });

    mapInstance.on('pointermove', (e) => {
      mapInstance.getTargetElement().style.cursor = mapInstance.hasFeatureAtPixel(mapInstance.getEventPixel(e.originalEvent))
        ? 'pointer'
        : '';
    });

    setMap(mapInstance);
    return () => mapInstance.setTarget(null);
  }, [WMS_URL, WMS_LAYER, USERNAME, PASSWORD]);

  const closePopup = () => {
    setSelectedFeature(null);
    setPopupPosition(null);
  };

  return (
    <div className={styles.wrapper}>
      <div ref={mapRef} className={styles.map} />
      {selectedFeature && popupPosition && (
        <PopupInfo
          map={map}
          feature={selectedFeature}
          position={popupPosition}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default MapComponent;
