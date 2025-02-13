{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [
    # backend
    jdk21
    maven3
    google-java-format
    postman
    # frontend
    pnpm
    nodejs_22
    nodePackages.prettier
  ];

  shellHook = ''
    export JDTLS_JVM_ARGS="-javaagent:$HOME/.m2/repository/org/projectlombok/lombok/1.18.36/lombok-1.18.36.jar"
    echo
    echo -e "\033[1;35mwelcome to the development shell!\033[0m"
    echo "
    backend
    ├── jdk21
    └── maven3

    frontend
    ├── pnpm
    └── nodejs_22
    "
  '';
}
