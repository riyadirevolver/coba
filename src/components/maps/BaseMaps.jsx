import { Marker } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import React, { useState } from "react";
import APP_CONFIG from "../../../app.config";
import WithAuth from "../../../lib/session/withAuth";

// export const getServerSideProps = WithAuth;

function BaseMaps({ data, onClick, yesIWantToUseGoogleMapApiInternals }) {
    const defaultProps = {
        center: {
            lat: -6.24058,
            lng: 106.85593,
        },
        zoom: 11,
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: "50vh", width: "100%", overflow: "hidden" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: APP_CONFIG.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                }}
                yesIWantToUseGoogleMapApiInternals={
                    yesIWantToUseGoogleMapApiInternals
                }
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onClick={e=>onClick?.(e)}
            />
            
        </div>
    );
}

export default BaseMaps;
