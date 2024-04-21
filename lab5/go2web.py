#!/home/sorin/git_repositories/PWeb-Labs/venv/bin/python

import sys
import socket
from urllib.parse import quote
from bs4 import BeautifulSoup
import json

CACHE_FILE = "http_cache.json"

def load_cache():
  """Loads the cache from a JSON file."""
  try:
    with open(CACHE_FILE, 'r') as f:
      return json.load(f)
  except (FileNotFoundError, json.JSONDecodeError):
    return {}

def save_cache(cache):
  """Saves the cache to a JSON file."""
  with open(CACHE_FILE, 'w') as f:
    json.dump(cache, f)

# Global cache dictionary (initially loaded from file)
http_cache = load_cache()

def make_http_request(host, path):
    try:
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
        return response
    except Exception as e:
        return None

def search_with_google(search_term):
    try:
        host = "www.google.com"
        search_query = quote(search_term)
        path = f"/search?q={search_query}"

        # Check if response is in cache
        if path in http_cache:
            print("Using cached response")
            return http_cache[path]

        response = make_http_request(host, path)
        if response:
            http_cache[path] = search_results
            save_cache(http_cache)
            
            return search_results
        else:
            return "Error: Failed to fetch search results"
    except Exception as e:
        return f"Error: {str(e)}"

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
        search_results = search_with_google(search_term)
        if isinstance(search_results, list):
            for i, url in enumerate(search_results, start=1):
                print(f"{i}. {url}")
        else:
            print(search_results)
    elif sys.argv[1] == '-h':
        print_help()
    else:
        print("Invalid option. Use '-h' for help.")

if __name__ == "__main__":
    main()
