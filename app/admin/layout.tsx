import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxRender from "@/redux/provider"
import { SessionProvider } from "next-auth/react"
import Body from "./component/globalController/body";
import './globals.css'
import styles from './layout.module.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <ReduxRender>
      <SessionProvider>
        <html lang="vi">
          <head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />

          </head>
          <body className={styles.container}>
            <Body>
              {children}
            </Body>
          </body>
        </html>
      </SessionProvider>
    </ReduxRender>
  );
}
