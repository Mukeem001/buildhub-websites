import { CreditCard, ShieldCheck } from "lucide-react";
import {
  PaymentProvider,
  PaymentSettings as PaymentSettingsType,
} from "../types/settings";

interface PaymentSettingsProps {
  settings: PaymentSettingsType;
  onChange: (settings: PaymentSettingsType) => void;
}

const PaymentSettings = ({
  settings,
  onChange,
}: PaymentSettingsProps) => {
  const updateProvider = (
    provider: keyof PaymentSettingsType,
    value: PaymentProvider
  ) => {
    onChange({
      ...settings,
      [provider]: value,
    });
  };

  const GatewayCard = ({
    title,
    providerKey,
    provider,
  }: {
    title: string;
    providerKey: keyof PaymentSettingsType;
    provider: PaymentProvider;
  }) => {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">

              <CreditCard size={22} />

            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>

              <p className="text-sm text-zinc-500">
                Payment Gateway
              </p>

            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              provider.enabled
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-zinc-700 text-zinc-400"
            }`}
          >
            {provider.enabled ? "Enabled" : "Disabled"}
          </span>

        </div>

        {/* Enable */}

        <div className="mb-5 flex items-center justify-between rounded-xl border border-zinc-800 p-4">

          <div>

            <h4 className="font-medium text-white">
              Enable Gateway
            </h4>

            <p className="text-sm text-zinc-500">
              Accept payments using {title}.
            </p>

          </div>

          <button
            onClick={() =>
              updateProvider(providerKey, {
                ...provider,
                enabled: !provider.enabled,
              })
            }
            className={`relative h-7 w-14 rounded-full transition ${
              provider.enabled
                ? "bg-cyan-500"
                : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                provider.enabled
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Sandbox */}

        <div className="mb-6 flex items-center justify-between rounded-xl border border-zinc-800 p-4">

          <div>

            <h4 className="font-medium text-white">
              Sandbox Mode
            </h4>

            <p className="text-sm text-zinc-500">
              Use testing environment.
            </p>

          </div>

          <button
            onClick={() =>
              updateProvider(providerKey, {
                ...provider,
                sandbox: !provider.sandbox,
              })
            }
            className={`relative h-7 w-14 rounded-full transition ${
              provider.sandbox
                ? "bg-cyan-500"
                : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                provider.sandbox
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>
                {/* Public Key */}

        <div className="mb-4">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Public Key
          </label>

          <input
            type="text"
            value={provider.publicKey}
            onChange={(e) =>
              updateProvider(providerKey, {
                ...provider,
                publicKey: e.target.value,
              })
            }
            placeholder="pk_live_xxxxxxxxx"
            className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Secret Key */}

        <div className="mb-4">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Secret Key
          </label>

          <input
            type="password"
            value={provider.secretKey}
            onChange={(e) =>
              updateProvider(providerKey, {
                ...provider,
                secretKey: e.target.value,
              })
            }
            placeholder="sk_live_xxxxxxxxx"
            className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Webhook Secret */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Webhook Secret
          </label>

          <input
            type="password"
            value={provider.webhookSecret}
            onChange={(e) =>
              updateProvider(providerKey, {
                ...provider,
                webhookSecret: e.target.value,
              })
            }
            placeholder="whsec_xxxxxxxxx"
            className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Status */}

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={22}
              className="text-emerald-400"
            />

            <div>

              <p className="font-semibold text-white">
                Gateway Status
              </p>

              <p className="text-sm text-zinc-400">
                {provider.enabled
                  ? "Gateway is enabled and ready to receive payments."
                  : "Gateway is currently disabled."}
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-white">
          Payment Settings
        </h2>

        <p className="mt-2 text-zinc-400">
          Configure all supported payment gateways for your
          BuildHub platform.
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <GatewayCard
          title="Stripe"
          providerKey="stripe"
          provider={settings.stripe}
        />

        <GatewayCard
          title="Razorpay"
          providerKey="razorpay"
          provider={settings.razorpay}
        />

        <GatewayCard
          title="PayPal"
          providerKey="paypal"
          provider={settings.paypal}
        />

        <GatewayCard
          title="Cashfree"
          providerKey="cashfree"
          provider={settings.cashfree}
        />

      </div>

    </div>
  );
};

export default PaymentSettings;