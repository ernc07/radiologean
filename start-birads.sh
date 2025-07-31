#!/bin/bash
streamlit run modules/birads-app/birads_app.py --server.port=$PORT --server.address=0.0.0.0 --server.headless=true --server.runOnSave=false --server.fileWatcherType=none
