import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useRefineContext,
  useResource,
} from "@refinedev/core";
import { HomeIcon } from "lucide-react";

import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export const Breadcrumb: React.FC<any> = ({
  showHome = true,
  hideIcons = false,
  meta,
}) => {
  const Link = useLink();
  const { breadcrumbs } = useBreadcrumb({
    meta,
  });

  const { hasDashboard } = useRefineContext();

  const { resources } = useResource();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  const breadCrumbItems = breadcrumbs.map(({ label, href }, key) => (
    <React.Fragment key={`breadcrumb-${key}`}>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {href ? (
          <BreadcrumbLink asChild>
            <Link to={href} title={label}>
              {label}
            </Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage>{label}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
    </React.Fragment>
  ));

  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {showHome || hasDashboard || rootRouteResource.found ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" title="Home">
                {rootRouteResource?.resource?.meta?.icon ?? (
                  <HomeIcon size={16} />
                )}
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : null}
        {breadCrumbItems}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
};
