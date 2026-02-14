import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

import Logo from "../assets/icons/Logo.svg";
import loginImg1 from "../assets/images/loginImg1.png";
import loginImg2 from "../assets/images/loginImg2.png";
import loginImg3 from "../assets/images/loginImg3.png";

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [cardsLoaded, setCardsLoaded] = useState([false, false, false]);

  const canSubmit = useMemo(
    () => login.trim().length > 0 && password.trim().length > 0,
    [login, password],
  );

  const markCardLoaded = (index) => {
    setCardsLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <div className={styles.shell}>
      <section className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <div className={styles.brandText}>Munavvar</div>
            <img src={Logo} className={styles.brandMark} alt="Logo" />
          </div>
          <p className={styles.brandSub}>
            <span>UFLEX</span> tomonidan yaratilgan
          </p>
        </div>

        <div className={styles.content}>
          <h1 className={styles.h1}>
            <span className={styles.h1Bold}>MunavvarA</span>
            <br />
            <span className={styles.h1Thin}>admin panel</span>
          </h1>
          <p className={styles.sub}>
            Tizimga kirish uchun ma’lumotlaringizni kiriting
          </p>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;

              // No API here — simple demo auth.
              setToken("demo-token");
              navigate("/dashboard", { replace: true });
            }}
          >
            <label className={styles.field}>
              <div className={styles.label}>Login</div>
              <Input
                placeholder="Login kiriting"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Parol</div>
              <Input
                type="password"
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className={styles.actions}>
              <Button disabled={!canSubmit} className={styles.submit}>
                Davom etish
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.right}>
        <div className={styles.rightInner}>
          <h2 className={styles.h2}>Barcha jarayonlar — bitta tizimda</h2>
          <p className={styles.rightSub}>
            UFLEX admin paneli orqali buyurtmalar, kuryerlar va mijozlarni qulay
            boshqaring.
          </p>

          <div className={styles.cards}>
            {[
              { src: loginImg1, alt: "Login Image 1" },
              { src: loginImg2, alt: "Login Image 2" },
              { src: loginImg3, alt: "Login Image 3" },
            ].map((img, index) => (
              <div key={img.alt} className={styles.card}>
                {!cardsLoaded[index] ? (
                  <div className={styles.skeleton} aria-hidden="true" />
                ) : null}
                <img
                  className={`${styles.cardImg} ${
                    cardsLoaded[index]
                      ? styles.cardImgVisible
                      : styles.cardImgHidden
                  }`}
                  src={img.src}
                  alt={img.alt}
                  decoding="async"
                  onLoad={() => markCardLoaded(index)}
                  onError={() => markCardLoaded(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
