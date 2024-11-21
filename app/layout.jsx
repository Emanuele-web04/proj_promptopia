import "../styles/global.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";// layout.jsx allows you to reuse components in all view, like nav and footer
export const metadata = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
