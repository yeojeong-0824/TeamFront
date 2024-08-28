'use client';

import React, { useEffect, useRef } from "react";

const MapWithSearchBox: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if the Google Maps script is already added to avoid adding it multiple times
    if (!window.google) {
      // Load the Google Maps script
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      window.document.body.appendChild(googleMapsScript);

      googleMapsScript.addEventListener("load", () => {
        if (window.google) {
          console.log("Google Maps script loaded successfully");
          initAutocomplete();
        }
      });
    } else {
      console.log("Google Maps script already loaded");
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    console.log("Initializing autocomplete and map");
    const map = new google.maps.Map(mapRef.current as HTMLElement, {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });

    const input = inputRef.current as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", () => {
      console.log("Places changed event triggered");
      const places = searchBox.getPlaces();

      if (places && places.length === 0) {
        console.log("No places found");
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places?.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        });

        const photos = place.photos;
        if (photos && photos.length > 0) {
          const photoUrl = photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });
          console.log(`Photo URL: ${photoUrl}`);
        }

        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };

  return (
    <div style={{ height: "100%" }}>
      <input
        id="pac-input"
        ref={inputRef}
        className="controls"
        type="text"
        placeholder="Search Box"
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          boxSizing: "border-box",
          border: "1px solid transparent",
          width: "240px",
          height: "32px",
          padding: "0 12px",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
          fontSize: "14px",
          outline: "none",
          textOverflow: "ellipses",
        }}
      />
      <div
        id="map"
        ref={mapRef}
        style={{ height: "500px", width: "100%" }}
      ></div>
    </div>
  );
};

export default MapWithSearchBox;
