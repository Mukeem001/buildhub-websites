import { useEffect, useState } from "react";

import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import SocialLinks from "./components/SocialLinks";
import PasswordSettings from "./components/PasswordSettings";
import TwoFactorAuth from "./components/TwoFactorAuth";
import Sessions from "./components/Sessions";
import Notifications from "./components/Notifications";
import Preferences from "./components/Preferences";
import { getCurrentUser } from "@/services/users";

import {
  Profile,
  PasswordSettings as PasswordSettingsType,
  TwoFactorSettings,
  Session,
  NotificationSettings,
  PreferenceSettings,
} from "./types/profile";

const ProfilePage = () => {

  const [profile, setProfile] = useState<Profile>({
  id: "1",

  firstName: "Ahmad",
  lastName: "Sheikh",
  username: "ahmadsheikh",

  email: "admin@buildhub.ai",
  phone: "+91 9876543210",

  designation: "Founder & CEO",
  company: "BuildHub",

  bio: "Building the next-generation AI Website Builder Platform.",

  website: "https://buildhub.ai",

  location: "New Delhi, India",

  timezone: "Asia/Kolkata",
  language: "English",

  avatar: "https://i.pravatar.cc/300?img=12",

  coverImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600",

  createdAt: "12 Jan 2026",

  updatedAt: "11 Jul 2026",
});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUser();
        const [firstName, ...rest] = user.fullName.split(" ");
        setProfile((prev) => ({
          ...prev,
          id: user.id,
          firstName,
          lastName: rest.join(" ") || prev.lastName,
          email: user.email,
          phone: user.phone || prev.phone,
          username: user.email.split("@")[0],
          role: user.role,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    void loadProfile();
  }, []);

  const [socialLinks, setSocialLinks] = useState({
    website: "https://buildhub.ai",
    twitter: "",
    linkedin: "",
    github: "",
    instagram: "",
    youtube: "",
    dribbble: "",
    discord: "",
    portfolio: "",
  });

  const [password, setPassword] =
    useState<PasswordSettingsType>({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [twoFactor, setTwoFactor] =
    useState<TwoFactorSettings>({
      enabled: false,
      method: "Authenticator",
      backupCodes: [
        "A12B-C34D",
        "E56F-G78H",
        "J90K-L12M",
        "N34P-Q56R",
        "S78T-U90V",
        "W12X-Y34Z",
      ],
    });

  const [sessions, setSessions] =
    useState<Session[]>([
      {
        id: "1",
        browser: "Google Chrome",
        device: "Desktop",
        os: "Windows 11",
        ipAddress: "192.168.1.1",
        location: "Delhi, India",
        lastActive: "Just Now",
        current: true,
      },
      {
        id: "2",
        browser: "Safari",
        device: "Mobile",
        os: "iOS",
        ipAddress: "192.168.1.15",
        location: "Mumbai, India",
        lastActive: "2 Hours Ago",
        current: false,
      },
    ]);

  const [notifications, setNotifications] =
    useState<NotificationSettings>({
      email: true,
      push: true,
      sms: false,
      marketing: false,
      securityAlerts: true,
      productUpdates: true,
    });

  const [preferences, setPreferences] =
    useState<PreferenceSettings>({
      theme: "Dark",
      language: "English",
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24 Hour",
      compactMode: false,
    });

  const saveHandler = () => {
    console.log("Profile Saved");
  };
    const logoutSession = (id: string) => {
    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );
  };

  const logoutAllSessions = () => {
    setSessions((prev) =>
      prev.filter((session) => session.current)
    );
  };

  const regenerateBackupCodes = () => {
    setTwoFactor((prev) => ({
      ...prev,
      backupCodes: [
        crypto.randomUUID().slice(0, 8).toUpperCase(),
        crypto.randomUUID().slice(0, 8).toUpperCase(),
        crypto.randomUUID().slice(0, 8).toUpperCase(),
        crypto.randomUUID().slice(0, 8).toUpperCase(),
        crypto.randomUUID().slice(0, 8).toUpperCase(),
        crypto.randomUUID().slice(0, 8).toUpperCase(),
      ],
    }));
  };

  const profileCompletion = 85;

  return (

    <div className="space-y-8">

      <ProfileHeader
        profile={profile}
        completion={profileCompletion}
        onEdit={() => console.log("Edit Profile")}
      />

      <PersonalInfo
        profile={profile}
        onChange={setProfile}
        onSave={saveHandler}
      />

      <ContactInfo
        profile={profile}
        onChange={setProfile}
        onSave={saveHandler}
      />

      <SocialLinks
        links={socialLinks}
        onChange={setSocialLinks}
        onSave={saveHandler}
      />

      <PasswordSettings
        password={password}
        onChange={setPassword}
        onSave={saveHandler}
      />

      <TwoFactorAuth
        settings={twoFactor}
        onChange={setTwoFactor}
        onSave={saveHandler}
        onRegenerateCodes={regenerateBackupCodes}
      />

      <Sessions
        sessions={sessions}
        onLogoutSession={logoutSession}
        onLogoutAll={logoutAllSessions}
      />

      <Notifications
        settings={notifications}
        onChange={setNotifications}
        onSave={saveHandler}
      />

      <Preferences
        preferences={preferences}
        onChange={setPreferences}
        onSave={saveHandler}
      />

    </div>

  );

};

export default ProfilePage;