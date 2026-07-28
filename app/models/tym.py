class Tym:
    def __init__(self, id, nazev, logo_url):
        self.id = id
        self.nazev = nazev
        self.logo_url = logo_url
    def to_dict(self):
        return {
            "id": self.id,
            "nazev": self.nazev,
            "logo_url": self.logo_url
        }
