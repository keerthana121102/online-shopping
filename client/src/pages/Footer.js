import React from "react";
import "./footer.css";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin, BsWhatsapp, BsTwitter } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
const Footer = () => {

  return (
    <footer  style={{backgroundColor:"rgba(0, 0, 0, 0.707)",color:"white"}}>
      <h4>CONTACT US</h4>
      <ul className="permalinks">
        <article className="contact__option">
          <BsWhatsapp className="contact__option_icon" />
          <a href="https://web.whatsapp.com/send?phone=+919150965100" target="_blank" rel="noreferrer">Chat</a>
        </article>
        
        <div className="footer__socials">
             
        <BsLinkedin />
        <AiFillInstagram />
        <BsTwitter />
      </div>

        <article className="contact__option">
          <MdOutlineEmail className="contact__option_icon" />
          <a href="mailto:keerthanachithra20@gmail.com" target="_blank" rel="noreferrer">Mail</a>
        </article>
      </ul>

    </footer>
  );
};

export default Footer;