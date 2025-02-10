{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [
    jdk21
    maven3
    awscli2
  ];
}
