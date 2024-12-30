import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TestSide from "../../../components/Sidetest";
import { WidgetSection } from "../../Dashboard";
import useAuth from "../../../hooks/useAuth";
import {
  AssetAllocationWidget,
  AssetsAssigned,
  AssetsCount,
  AssetsInRepair,
  MaintenanceRequests,
  NewAssetsAdded,
  QuantityRemainingWidget,
} from "../../../Widgets/CMS/customerServiceWidgets";

import {
  NetworkIssuesResolved,
  PCFixes,
  PCFixesLineGraph,
  PCFixesPending,
  PCFixesProgress,
  WiFiConfiguration,
  WiFiTraffic,
} from "../../../Widgets/ITWidgets";
import ManageAsset from "./ManageAsset";
import MyAssets from "./MyAssets";
import AssetReports from "./AssetReports";

const Assets = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const customerServiceWidgetsData = {
    totalAssets: 200,
    pendingMaintenance: 15,
    assignedAssets: 120,
    assetsInRepair: 5,
    newAssetsAdded: 10,
  };

  const customerServiceWidgets = [
    {
      heading: "Asset Management",
      subModule: "asset",
      widgets: [
        <AssetsCount
          title={
            authUser.user.department.find(
              (dept) => dept.name === "TopManagement"
            )
              ? "Total Assets"
              : authUser.user.department.find((dept) => dept.name === "IT") ||
                authUser.user.department.find((dept) => dept.name === "Tech")
              ? "IT Assets"
              : "Maintainence Assets"
          }
          route={"/it/asset/manage"}
          count={customerServiceWidgetsData.totalAssets}
        />,
        <AssetsAssigned
          route={"/it/asset/manage"}
          assigned={customerServiceWidgetsData.assignedAssets}
        />,
        <AssetsInRepair
          route={"/it/asset/manage"}
          count={customerServiceWidgetsData.assetsInRepair}
        />,
      ],
    },
  ];

  const itWidgetsData = {
    pcFixes: 120, // Number of PCs fixed
    pcFixesProgress: 75, // Progress of PC fixes (percentage)
    pcFixesPending: 25, // Pending PC repairs (number of pending repairs)
    wifiConfig: 35, // Number of WiFi configurations
    wifiTraffic: 150, // Total WiFi traffic in GB
    networkIssues: 45, // Number of network issues resolved
  };

  const itWidgets = [
    {
      heading: "PC Maintenance",
      widgets: [
        <PCFixes count={itWidgetsData.pcFixes} />,
        <PCFixesProgress progress={itWidgetsData.pcFixesProgress} />,
        <PCFixesPending pendingCount={itWidgetsData.pcFixesPending} />,
      ],
    },
    {
      heading: "WiFi & Network",
      widgets: [
        <WiFiConfiguration count={itWidgetsData.wifiConfig} />,
        <WiFiTraffic traffic={itWidgetsData.wifiTraffic} />,
        <NetworkIssuesResolved count={itWidgetsData.networkIssues} />,
      ],
    },
    {
      heading: "Overview",
      widgets: [<PCFixesLineGraph />],
    },
  ];

  return (
    <div className="flex min-h-screen bg-white flex-1 w-full">
      <div>
        
      </div>
      <div className="w-full h-screen overflow-auto">
        {location.pathname === "/assets" ? (
          <div className="w-full">
            <div className=" p-4 rounded-lg flex flex-col gap-4">
              <div className="bg-white rounded-md">
                {customerServiceWidgets
                  .filter((section) => section.subModule === "asset")
                  .map((section, index) => (
                    <WidgetSection
                      key={index}
                      heading={section.heading}
                      widgets={section.widgets}
                    />
                  ))}

                <div className="flex w-full flex-1 flex-grow gap-x-4">
                  <QuantityRemainingWidget
                    totalStock={100}
                    remainingStock={30}
                    assetType="Laptops"
                  />

                  <QuantityRemainingWidget
                    totalStock={100}
                    remainingStock={10}
                    assetType="Mobiles"
                  />
                </div>
              </div>
              {itWidgets.map((section, index) => (
                <WidgetSection
                  key={index}
                  heading={section.heading}
                  widgets={section.widgets}
                />
              ))}
            </div>
          </div>
        ) : location.pathname === "/assets/manage" ? (
          <ManageAsset />
        ) : location.pathname === "/assets/my-assets" ? (
          <MyAssets />
        ) : location.pathname === "/assets/reports" ? (
          <AssetReports />
        ) : (
          <>
            <h1>Coming Soon</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Assets;
