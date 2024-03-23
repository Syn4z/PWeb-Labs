#!/home/sorin/git_repositories/PWeb-Labs/venv/bin/python

import sys
import socket
from urllib.parse import urlparse
from bs4 import BeautifulSoup

def make_http_request(url):
    try:
        parsed_url = urlparse(url)
        host = parsed_url.netloc
        path = parsed_url.path if parsed_url.path else '/'
        request = f"GET {path} HTTP/1.1\r\nHost: {host}\r\nConnection: close\r\n\r\n"
        
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((host, 80))
            s.sendall(request.encode())
            response = b''
            while True:
                data = s.recv(1024)
                if not data:
                    break
                response += data
        soup = BeautifulSoup(response, 'html.parser')
        return soup.get_text()
    except Exception as e:
        return f"Error: {str(e)}"

def search_with_google(search_term):
    pass

def print_help():
    print("Usage:")
    print("  go2web -u <URL>            Make an HTTP request to the specified <URL> and print the response")
    print("  go2web -s <search-term>    Make an HTTP request to search the <search-term> using Google and print top 10 results")
    print("  go2web -h                  List available commands")

def main():
    if len(sys.argv) < 3:
        print_help()
        return
    
    if sys.argv[1] == '-u':
        url = sys.argv[2]
        print(make_http_request(url))
    elif sys.argv[1] == '-s':
        search_term = sys.argv[2]
        print(search_with_google(search_term))
    elif sys.argv[1] == '-h':
        print_help()
    else:
        print("Invalid option. Use '-h' for help.")

if __name__ == "__main__":
    main()
