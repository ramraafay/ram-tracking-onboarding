{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [
    # backend
    jdk21
    maven3
    postman
    xmlformat
    google-java-format
    # frontend
    pnpm
    nodejs_22
    nodePackages.prettier

    (pkgs.writeScriptBin "backend" ''
      #!${pkgs.stdenv.shell}
      cd $PROJECT_HOME/backend && mvn spring-boot:run
    '')
    (pkgs.writeScriptBin "frontend" ''
      #!${pkgs.stdenv.shell}
      cd $PROJECT_HOME/frontend && pnpm dev
    '')
    (pkgs.writeScriptBin "test" ''
      #!${pkgs.stdenv.shell}
      cd $PROJECT_HOME/backend && mvn test
      cd $PROJECT_HOME/frontend && pnpm test
    '')
  ];

  shellHook = ''
    export PROJECT_HOME=$(pwd)
    export JDTLS_JVM_ARGS="-javaagent:$HOME/.m2/repository/org/projectlombok/lombok/1.18.36/lombok-1.18.36.jar"
    echo
    echo -e "\033[1;35mwelcome to the development shell!\033[0m"
    echo "
    backend
    ├── jdk21
    ├── maven3
    ├── postman
    ├── xmlformat
    └── google-java-format

    frontend
    ├── pnpm
    ├── nodejs_22
    └── nodePackages.prettier
    "
  '';
}
