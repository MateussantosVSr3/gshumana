"""Baixa os arquivos oficiais do INMET e extrai somente a estação A701."""
from __future__ import annotations

import hashlib
import io
import sys
import urllib.request
import zipfile
from pathlib import Path

YEARS = (2024, 2025)
BASE_URL = "https://portal.inmet.gov.br/uploads/dadoshistoricos/{year}.zip"
DESTINATION = Path(__file__).parent / "dados"


def download(year: int) -> None:
    url = BASE_URL.format(year=year)
    request = urllib.request.Request(url, headers={"User-Agent": "ClimaCidadao-FIAP/1.0"})
    print(f"Baixando {url} ...")
    with urllib.request.urlopen(request, timeout=120) as response:
        payload = response.read()
    digest = hashlib.sha256(payload).hexdigest()
    with zipfile.ZipFile(io.BytesIO(payload)) as archive:
        members = [name for name in archive.namelist() if "_A701_" in name.upper() and name.upper().endswith(".CSV")]
        if not members:
            raise RuntimeError(f"Estação A701 não encontrada no ZIP de {year}")
        for member in members:
            target = DESTINATION / Path(member).name
            target.write_bytes(archive.read(member))
            print(f"Extraído {target.name} ({target.stat().st_size} bytes)")
    print(f"SHA-256 ZIP {year}: {digest}")


if __name__ == "__main__":
    DESTINATION.mkdir(parents=True, exist_ok=True)
    try:
        for selected_year in YEARS:
            download(selected_year)
    except Exception as exc:
        print(f"Falha: {exc}", file=sys.stderr)
        raise SystemExit(1)
