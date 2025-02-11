{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [
    # backend
    h2
    jdk21
    maven3
    # frontend
    pnpm
    nodejs_22
  ];

  shellHook = ''
    echo
    echo -e "\033[1;35mwelcome to the development shell!\033[0m"
    echo "
    backend
    ├── jdk21
    ├── maven3
    └── h2

    frontend
    ├── pnpm
    └── nodejs_22
    "
  '';
}
