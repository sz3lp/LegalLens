import logging
from logging.handlers import TimedRotatingFileHandler
import json
from pathlib import Path

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

class JsonFormatter(logging.Formatter):
    def format(self, record):
        data = {
            "timestamp": self.formatTime(record, self.datefmt),
            "level": record.levelname,
            "message": record.getMessage(),
        }
        standard = logging.LogRecord(None, None, "", 0, "", [], None).__dict__.keys()
        extras = {k: v for k, v in record.__dict__.items() if k not in standard}
        if record.args:
            data.update(record.args)
        data.update(extras)
        return json.dumps(data)

handler = TimedRotatingFileHandler(LOG_DIR / "legallens.log", when="D")
handler.setFormatter(JsonFormatter())

logger = logging.getLogger("legallens")
logger.setLevel(logging.INFO)
logger.addHandler(handler)
logger.propagate = False
