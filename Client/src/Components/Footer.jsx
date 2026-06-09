import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
       
        <div>
          <h3>MyCart</h3>
          <p>Your one-stop shopping destination</p>
        </div>

        
        <div>
          <h4>Quick Links</h4>
          <ul style={styles.list}>
            <li>Home</li>
            <li>Cart</li>
            <li>Orders</li>
            <li>Contact</li>
          </ul>
        </div>

       
        <div>
          <h4>Follow Us</h4>
          <p>Facebook | Instagram | Twitter</p>
        </div>

      </div>

      
      <div style={styles.bottom}>
        <p> 2026 MyCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "100px 20px",
    marginTop: "50px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  bottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid #444",
    paddingTop: "10px",
  },
};

export default Footer;