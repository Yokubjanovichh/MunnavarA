import { useState } from "react";

import styles from "./Settings.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function BreadcrumbChevron() {
  return (
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.5 0.5L4 4L0.5 7.5"
        stroke="#7A8086"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 4.75H6.75667M6.08333 6.75H6.75V9.41667H7.41667M0.75 6.75C0.75 7.53793 0.905195 8.31815 1.20672 9.0461C1.50825 9.77405 1.95021 10.4355 2.50736 10.9926C3.06451 11.5498 3.72595 11.9917 4.4539 12.2933C5.18185 12.5948 5.96207 12.75 6.75 12.75C7.53793 12.75 8.31815 12.5948 9.0461 12.2933C9.77405 11.9917 10.4355 11.5498 10.9926 10.9926C11.5498 10.4355 11.9917 9.77405 12.2933 9.0461C12.5948 8.31815 12.75 7.53793 12.75 6.75C12.75 5.1587 12.1179 3.63258 10.9926 2.50736C9.86742 1.38214 8.3413 0.75 6.75 0.75C5.1587 0.75 3.63258 1.38214 2.50736 2.50736C1.38214 3.63258 0.75 5.1587 0.75 6.75Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ open }) {
  return (
    <svg
      className={open ? styles.chevronOpen : styles.chevron}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 7.66667L8.5 10.1667L6 7.66667M8.5 1C7.51509 1 6.53982 1.19399 5.62987 1.5709C4.71993 1.94781 3.89314 2.50026 3.1967 3.1967C2.50026 3.89314 1.94781 4.71993 1.5709 5.62987C1.19399 6.53982 1 7.51509 1 8.5C1 9.48491 1.19399 10.4602 1.5709 11.3701C1.94781 12.2801 2.50026 13.1069 3.1967 13.8033C3.89314 14.4997 4.71993 15.0522 5.62987 15.4291C6.53982 15.806 7.51509 16 8.5 16C10.4891 16 12.3968 15.2098 13.8033 13.8033C15.2098 12.3968 16 10.4891 16 8.5C16 6.51088 15.2098 4.60322 13.8033 3.1967C12.3968 1.79018 10.4891 1 8.5 1Z"
        stroke="#646B72"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Settings() {
  const [pushOpen, setPushOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);

  const [pushText, setPushText] = useState("Suv 25 litr");
  const [pushTo, setPushTo] = useState("Mijoz");

  const [login, setLogin] = useState("Admin123");
  const [password, setPassword] = useState("1234");
  const [password2, setPassword2] = useState("1234");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>General Settings</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.crumb}>Boshqaruv paneli</span>
            <span className={styles.sep}>
              <BreadcrumbChevron />
            </span>
            <span className={styles.crumbActive}>General Settings</span>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setPushOpen((v) => !v)}
          aria-expanded={pushOpen}
        >
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <InfoIcon />
            </span>
            <span>Push bildirishnoma</span>
          </div>
          <ChevronDown open={pushOpen} />
        </button>

        {pushOpen ? (
          <div className={styles.sectionBody}>
            <div className={styles.formGrid2}>
              <div className={styles.field}>
                <div className={styles.label}>Math</div>
                <Input
                  size="small"
                  value={pushText}
                  onChange={(e) => setPushText(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Kimga</div>
                <select
                  className={styles.select}
                  value={pushTo}
                  onChange={(e) => setPushTo(e.target.value)}
                  aria-label="Kimga"
                >
                  <option value="Mijoz">Mijoz</option>
                  <option value="Kuryer">Kuryer</option>
                </select>
              </div>
            </div>

            <div className={styles.actionsRow}>
              <Button type="button" size="small" className={styles.pillBtn}>
                Yuborish
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.sectionCard}>
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => setProfileOpen((v) => !v)}
          aria-expanded={profileOpen}
        >
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <InfoIcon />
            </span>
            <span>Shaxsiy axborotlar</span>
          </div>
          <ChevronDown open={profileOpen} />
        </button>

        {profileOpen ? (
          <div className={styles.sectionBody}>
            <div className={styles.formGrid2}>
              <div className={`${styles.field} ${styles.span2}`}>
                <div className={styles.label}>Login</div>
                <Input
                  size="small"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Parol</div>
                <Input
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Parolni tasdiqlash</div>
                <Input
                  size="small"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.actionsRow}>
              <Button type="button" size="small" className={styles.pillBtn}>
                Almashtirish
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
