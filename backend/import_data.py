import pandas as pd
from sqlalchemy import create_engine

# Load the data
try:
    df = pd.read_csv('../../WA-Climbs/v0.csv')
    for i in range(1, 11):
      if i == 11:
        df_temp = pd.read_csv(f'../../WA-Climbs/v{i}+.csv')
      else:
        df_temp = pd.read_csv(f'../../WA-Climbs/v{i}.csv')
      df = pd.concat([df, df_temp], ignore_index=True)
except Exception as e:
    print(f"Error loading CSV files: {e}")
    exit()

# Check DataFrame contents
print("Data preview:")
print(df.head())

# Connect to the database
try:
    engine = create_engine('mysql+pymysql://root:Theantisanta127!@localhost/climbs_db')
    with engine.connect() as connection:
        # Write the data to the database
        df.to_sql('climbs', con=connection, if_exists='replace', index=False)
        print("Data imported successfully.")
except Exception as e:
    print(f"Error connecting to the database or writing data: {e}")
