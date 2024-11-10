import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Shift Mavens</h3>
            <p className="text-sm text-primary-foreground/60">
              Empowering startups with expert guidance and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild className="hover:text-secondary">
                <a href="https://twitter.com" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:text-secondary">
                <a href="https://facebook.com" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:text-secondary">
                <a href="https://instagram.com" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:text-secondary">
                <a href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" asChild className="text-primary-foreground hover:text-secondary p-0 h-auto">
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-primary-foreground hover:text-secondary p-0 h-auto">
                  <Link to="/compliance-packages">Packages</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-primary-foreground hover:text-secondary p-0 h-auto">
                  <Link to="/upgrade">Upgrade Plan</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" asChild className="text-primary-foreground hover:text-secondary p-0 h-auto">
                  <Link to="/help">Help Center</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-primary-foreground hover:text-secondary p-0 h-auto">
                  <Link to="/terms">Terms of Service</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="text-primary-foreground hover:text-secondary p-0 h-auto">
                  <Link to="/privacy">Privacy Policy</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                contact@shiftmavens.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Shift Mavens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};