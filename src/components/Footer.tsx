const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1">
            {/* <img
              src="/path/to/logo.png"
              alt="Company Logo"
              className="w-32 h-32 object-contain"
            /> */}
            <p className="mt-2 text-sm text-gray-700">RED</p>
          </div>

          {/* Navigation Section */}
          <nav className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Links Section */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Stay Connected</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright Section */}
          <div className="col-span-1 text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Company Name. All rights
              reserved.
            </p>
            <p className="mt-2">
              Developed by{" "}
              <a href="#" className="text-primary-600 hover:underline">
                dav100ide-red
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
