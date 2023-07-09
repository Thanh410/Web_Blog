"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {error && error}
      </form>
      <div className={styles.credentials}>
        {/* Google */}
        <Image
          onClick={() => {
            signIn("google");
          }}
          width={30}
          height={30}
          className={styles.icon}
          src="https://th.bing.com/th/id/R.2991eba27a990a1c9eb56d9633343020?rik=gzbdRDysD7sQSA&pid=ImgRaw&r=0"
        ></Image>
        {/* Github */}
        <Image
          onClick={() => {
            signIn("github");
          }}
          width={30}
          height={30}
          className={styles.icon}
          src="https://th.bing.com/th/id/OIP.8SVgggxQcO5L6Dw_61ac4QAAAA?pid=ImgDet&rs=1"
        ></Image>
      </div>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
