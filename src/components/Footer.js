import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="pt-4 pb-12 bg-gray-100">
      <div className="container mx-auto flex flex-col items-center text-sm ">
        <ul className="flex gap-10 mb-3">
          <Link to="/PrivacyPolicyPage">
            <li>개인정보</li>
          </Link>
          <Link to="/TermsOfUsePage">
            <li>이용약관</li>
          </Link>
        </ul>
        <ul className="flex gap-10">
            <li className="font-bold">Nado Corp.</li>       
            <li>Nado4321o@gmail.com</li>        
        </ul>
      </div>
    </div>
  );
}

export default Footer;