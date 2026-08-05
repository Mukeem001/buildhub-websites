import PublishHeader from "./PublishHeader";
import WebsiteInfoForm from "./WebsiteInfoForm";
import DomainSelector from "./DomainSelector";
import PublishOptions from "./PublishOptions";
import PublishFooter from "./PublishFooter";

import type { DomainType } from "../../types/publish";

interface PublishBodyProps {
  templateName: string;

  websiteName: string;
  setWebsiteName: (value: string) => void;

  domainType: DomainType;
  setDomainType: (value: DomainType) => void;

  customDomain: string;
  setCustomDomain: (value: string) => void;

  dnsHost: string;
  setDnsHost: (value: string) => void;

  dnsTarget: string;
  setDnsTarget: (value: string) => void;

  createAdminPanel: boolean;
  setCreateAdminPanel: (value: boolean) => void;

  enableSSL: boolean;
  setEnableSSL: (value: boolean) => void;

  loading: boolean;

  customDomainConnected?: boolean;
  customDomainVerified?: boolean;
  onConnectDomain?: () => void;
  onVerifyDomain?: () => void;

  onClose: () => void;

  onPublish: () => void;
}

const PublishBody = ({
  templateName,

  websiteName,
  setWebsiteName,

  domainType,
  setDomainType,

  customDomain,
  setCustomDomain,

  dnsHost,
  setDnsHost,

  dnsTarget,
  setDnsTarget,

  createAdminPanel,
  setCreateAdminPanel,

  enableSSL,
  setEnableSSL,

  loading,
  customDomainConnected = false,
  customDomainVerified = false,
  onConnectDomain,
  onVerifyDomain,

  onClose,

  onPublish,
}: PublishBodyProps) => {
  return (
    <>
      <PublishHeader
        templateName={templateName}
        onClose={onClose}
      />

      <div className="space-y-8 p-6 lg:p-8">

        {domainType === "subdomain" ? (
          <WebsiteInfoForm
            websiteName={websiteName}
            setWebsiteName={setWebsiteName}
            domainType={domainType}
          />
        ) : null}

        <DomainSelector
          websiteName={websiteName}
          setWebsiteName={setWebsiteName}
          domainType={domainType}
          setDomainType={setDomainType}
          customDomain={customDomain}
          setCustomDomain={setCustomDomain}
          dnsHost={dnsHost}
          setDnsHost={setDnsHost}
          dnsTarget={dnsTarget}
          setDnsTarget={setDnsTarget}
        />

        <PublishOptions
          createAdminPanel={createAdminPanel}
          setCreateAdminPanel={setCreateAdminPanel}
          enableSSL={enableSSL}
          setEnableSSL={setEnableSSL}
        />

      </div>

      <PublishFooter
        websiteName={websiteName}
        domainType={domainType}
        customDomain={customDomain}
        customDomainConnected={customDomainConnected}
        customDomainVerified={customDomainVerified}
        loading={loading}
        onCancel={onClose}
        onConnectDomain={onConnectDomain}
        onVerifyDomain={onVerifyDomain}
        onPublish={onPublish}
      />
    </>
  );
};

export default PublishBody;