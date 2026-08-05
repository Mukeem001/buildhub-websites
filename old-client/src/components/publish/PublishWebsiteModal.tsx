import { AnimatePresence, motion } from "framer-motion";

import PublishBody from "./PublishBody";
import PublishProgress from "./PublishProgress";
import PublishSuccess from "./PublishSuccess";

import { usePublish } from "../../hooks/usePublish";

interface PublishWebsiteModalProps {
  isOpen: boolean;

  onClose: () => void;

  templateId: number | string;

  templateName: string;
}

const PublishWebsiteModal = ({
  isOpen,
  onClose,
  templateId,
  templateName,
}: PublishWebsiteModalProps) => {
  const publish = usePublish(
    templateId,
    templateName
  );

  const handleClose = () => {
    publish.reset();

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >

        <motion.div
          initial={{
            scale: .95,
            opacity: 0,
            y: 30,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: .95,
            opacity: 0,
          }}
          transition={{
            duration: .25,
          }}
          className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
        >

          {publish.step === "details" && (
            <PublishBody
              templateName={templateName}
              websiteName={publish.websiteName}
              setWebsiteName={
                publish.setWebsiteName
              }
              domainType={publish.domainType}
              setDomainType={
                publish.setDomainType
              }
              customDomain={
                publish.customDomain
              }
              setCustomDomain={
                publish.setCustomDomain
              }
              createAdminPanel={
                publish.createAdminPanel
              }
              setCreateAdminPanel={
                publish.setCreateAdminPanel
              }
              enableSSL={
                publish.enableSSL
              }
              setEnableSSL={
                publish.setEnableSSL
              }
              dnsHost={publish.dnsHost}
              setDnsHost={publish.setDnsHost}
              dnsTarget={publish.dnsTarget}
              setDnsTarget={publish.setDnsTarget}
              loading={publish.loading}
              customDomainConnected={
                publish.customDomainConnected
              }
              customDomainVerified={
                publish.customDomainVerified
              }
              onConnectDomain={
                publish.connectCustomDomain
              }
              onVerifyDomain={
                publish.verifyCustomDomain
              }
              onClose={handleClose}
              onPublish={publish.publish}
            />
          )}

          {publish.step ===
            "publishing" && (
            <div className="p-8">

              <PublishProgress
                currentStep={
                  publish.currentStep
                }
              />

            </div>
          )}

          {publish.step ===
            "success" && (
            <div className="p-8">

              <PublishSuccess
                websiteUrl={
                  publish.websiteUrl
                }
                adminUrl={
                  publish.adminUrl
                }
                onClose={handleClose}
              />

            </div>
          )}

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
};

export default PublishWebsiteModal;