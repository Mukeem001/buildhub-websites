import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@buildhub.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (800) 123-4567",
      description: "Mon - Fri, 9 AM - 6 PM",
    },
    {
      icon: MapPin,
      title: "Our Office",
      value: "San Francisco, CA",
      description: "United States",
    },
    {
      icon: Clock3,
      title: "Working Hours",
      value: "Mon - Friday",
      description: "9:00 AM - 6:00 PM",
    },
  ];

  return (
    <div>
      <div className="mb-7">
        <p className="text-sm font-semibold text-blue-400">Contact Information</p>

        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Let's Start A Conversation
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
          Whether you're getting started or already building with BuildHub,
          we're always happy to help.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-slate-600 transition duration-300 group-hover:text-blue-400" />
              </div>

              <h3 className="mt-5 text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 break-words text-sm font-medium text-blue-400">
                {item.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;