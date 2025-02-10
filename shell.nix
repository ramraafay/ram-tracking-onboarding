{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [
    # backend
    jdk21
    maven3
    awscli2
    # frontend
    pnpm
    nodejs_22
  ];
}
